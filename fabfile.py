from fabric import Connection, task
from subprocess import check_output

ENVIRONMENTS = {
    'tests': {
        'host': 'apps@test119.ciancoders.com',
        'check_branch': 'develop',
        'virtualenv': 'soporte',
        'home_dir': '/home/apps',
        'app_dir': '/apps/soporte/app',
        'local_settings': 'app/local_settings.py',
        'restart_supervisor': True,
        'frontends': [
            {'src': 'frontend', 'remote_dir': '/apps/soporte/frontend'},
        ]
    }
}


@task
def deploy(context, deploy_environment):
    env = ENVIRONMENTS[deploy_environment]

    # we have to be in the correct git branch
    rama_git = check_output(
        ["git", "symbolic-ref", "--short", "HEAD"]).decode("utf8")[0:-1]
    if env['check_branch'] and rama_git != env['check_branch']:
        raise Exception('La rama definida para esta operacion ({}) no coincide con la rama actual ({})'.format(
            env['check_branch'], rama_git))

    # paths
    host = env['host']
    # paths / front
    for front in env['frontends']:
        front['remote_path'] = '{}:{}{}'.format(
            host, env['home_dir'], front['remote_dir'])
        print('generated remote path', front['remote_path'])
    # paths / back
    backend_path = '{}:{}{}'.format(host, env['home_dir'], env['app_dir'])

    # deploy
    with Connection(host) as conn:
        # context runs on the local machine
        print('----------- BUILD & UPLOAD FRONTENDS ------------')
        for front in env['frontends']:
            with context.cd(front['src']):
                # build frontend
                context.run('yarn', replace_env=False)
                context.run(
                    'NODE_OPTIONS=--max_old_space_size=4096 yarn run build:release', replace_env=False)
                # upload frontend
                with context.cd('docroot'):
                    context.run(
                        'rsync -r --info=progress2 --delete-after -z -e ssh . ' + front['remote_path'], replace_env=False)
                # precompress it
                with conn.cd(env['home_dir'] + front['remote_dir']):
                    conn.run('gzip -k --best --recursive *')
        # upload backend
        context.run('rsync -r --info=progress2 --delete-after --exclude frontend  --exclude .git --exclude ' + env['local_settings'] + ' -z -e ssh . ' +
                    backend_path, replace_env=False)
        # connection runs on the remote machine
        with conn.cd(env['home_dir'] + env['app_dir']):
            with conn.prefix('source /etc/bash_completion.d/virtualenvwrapper'):
                with conn.prefix('workon {}'.format(env['virtualenv'])):
                    conn.run(
                        'pip install --upgrade --no-cache-dir -r requirements.txt', replace_env=False)
                    conn.run('python manage.py migrate', replace_env=False)
                    conn.run('python manage.py collectstatic --noinput',
                             replace_env=False)
                    conn.run(
                        'touch ' + env['local_settings'], replace_env=False)

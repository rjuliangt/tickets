import React, { Component } from "react";
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
// ---- propiedades ticket

import Etiquetas from "./Etiquetas//ListadoContainer";
import Tipo from "./Tipos/ListadoContainer";
import Estados from "./Estados/ListadoContainer";
import Prioridades from "./Prioridades/ListadoContainer";
class ExampleTabs extends Component {
    render() {
        return (
            <div className="py-4 p-3">
                <div className="row">
                    <div className="mb-4 col-lg-12">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-start">
                                <h3 className="m-0 txt-22-n color-003">
                                    Propiedad de Ticket
                                </h3>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <Tabs
                                    defaultActiveKey="SEGUNDO_TOP"
                                    tabBarPosition="top"
                                    onChange={this.callback}
                                    renderTabBar={() => <ScrollableInkTabBar />}
                                    renderTabContent={() => <TabContent />}
                                >
                                    <TabPane tab="Tipos de tickets" key="Tipos">
                                        <div className="py-4 px-3">
                                            <Tipo />
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Etiquetas" key="Etiquetas">
                                        <div className="py-4 px-3">
                                            <Etiquetas />
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Estados" key="Estados">
                                        <div className="py-4 px-3">
                                            <Estados />
                                        </div>
                                    </TabPane>
                                    <TabPane
                                        tab="Prioridades"
                                        key="Prioridades"
                                    >
                                        <div className="py-4 px-3">
                                            <Prioridades />
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExampleTabs;

import React, { Component } from "react";
import { Modal, Button, Switch, Divider } from "antd";
export default class ModalAbout extends Component {

  onChange = (state) => {
    const { changeSettings } = this.props;
    changeSettings({keyboard: state})
  };

  render() {
    const { title, open, closeModal, settings } = this.props;

    return (
      <Modal
        title={title}
        style={{ top: 20 }}
        open={open}
        footer={[
          <Button key="ok" type="primary" onClick={closeModal}>
            {"Labi"}
          </Button>,
        ]}
        onCancel={closeModal}
      >
        <p>Balstīta uz pasaulē populāru spēli - Lingo.</p>
        <p>
          Veidota kā atvērtā koda lietotne mācību nolūkos (tāpēc ir vēl ko
          uzlabot/labot). Pašā pamatā react un ant.design UI, hostēta bez maksas
          uz Vercel platformas. Kaut kur kodu var atrast GitHub.
        </p>
        <Divider orientation="left">Noteikumi </Divider>
        <ul>
          <li>Jāatmin vārds latviešu valodā</li>
          <li>
            Jo ātrāk atmin nejauši izvēlētu vārdu, jo vairāk punkti tiek
            piešķirti
          </li>
          <li>
            Ja vārdu neatmin ar 5 mēģinājumiem, spēle un iekrātie punkti tiek
            zaudēti
          </li>
          <li>
            Ir iespējams noskaidrot minamā vārda skaidrojumu, bet tad par šo
            vārdu punktus vairs nav iespējams iegūt
          </li>
        </ul>
        <Divider orientation="left">Iestatījumi </Divider>
        <p>
          <Switch defaultChecked={settings.keyboard} onChange={this.onChange} /> Rādīt virtuālo klaviatūru
        </p>

        <Divider orientation="left">Klaviatūra saīsenes </Divider>
        <ul>
          <li>Q - atver šo paziņojumu</li>
          <li>X - notiek "palīdzības" paprasīšana</li>
        </ul>
      </Modal>
    );
  }
}

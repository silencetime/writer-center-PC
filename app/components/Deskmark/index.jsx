/*
 * @file component Deskmark
 */

import React from 'react';
// UUID就是Universal Unique IDentifier的缩写，它是一个128位，16字节的值，并确保在时间和空间上唯一。
import uuid from 'uuid';
// 引入相应的模块
import CreateBar from '../CreateBar';
import List from '../List';
import ItemEditor from '../ItemEditor';
import ItemShowLayer from '../ItemShowLayer';

import './style.scss';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selectedId: null,
      editing: false,
    };
    this.selectItem = this.selectItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  selectItem(id) {
    if (id === this.state.selectedId) {
      return;
    }

    this.setState({
      selectedId: id,
      editing: false,
    });
  }

  saveItem(item) {
    let items = this.state.items;

    // new item
    if (!item.id) {
      items = [...items, {
        ...item,
        id: uuid.v4(),
        time: new Date().getTime(),
      }];
    // existed item
    } else {
      items = items.map(

        exist => (
          exist.id === item.id
          ? {
            ...exist,
            ...item,
          }
          : exist
        )
      );
    }

    this.setState({
      items,
      selectedId: item.id,
      editing: false,
    });
  }

  deleteItem(id) {
    if (!id) {
      return;
    }

    this.setState({
      items: this.state.items.filter(
        result => result.id !== id
      ),
    });
  }

  createItem() {
    this.setState({
      selectedId: null,
      editing: true,
    });
  }

  editItem(id) {
    this.setState({
      selectedId: id,
      editing: true,
    });
  }

  cancelEdit() {
    this.setState({ editing: false });
  }

  render() {
    const { items, selectedId, editing } = this.state;
    const selected = selectedId && items.find(item => item.id === selectedId);
    const mainPart = editing
      ? (
        <ItemEditor
          item={selected}
          onSave={this.saveItem}
          onCancel={this.cancelEdit}
        />
      )
      : (
        <ItemShowLayer
          item={selected}
          onEdit={this.editItem}
          onDelete={this.deleteItem}
        />
      );

    return (
      <section className="deskmark-component">
        <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
          <a className="navbar-brand" href="#">Deskmark App</a>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-4 list-group">
              <CreateBar onClick={this.createItem} />
              <List
                items={this.state.items}
                onSelect={this.selectItem}
              />
            </div>
            {mainPart}
          </div>
        </div>
      </section>
    );
  }
}

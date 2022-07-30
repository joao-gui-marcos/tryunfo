import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardImage: '',
      attr1: '0',
      attr2: '0',
      attr3: '0',
      cardRare: 'normal',
      cardTrunfo: false,
      deck: [],
      trunfoExists: false,
      filteredDeck: [],
      textFilter: '',
      rarityFilter: 'todas',
      superTrunfoFilter: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.filterDeck = this.filterDeck.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleValidation() {
    const maxValue = 90;
    const minValue = 0;
    const maxSum = 210;
    const { cardName, cardDescription, cardImage, attr1, attr2, attr3 } = this.state;
    if (cardName === '' || cardDescription === '' || cardImage === '') return true;
    if (Number(attr1) > maxValue || Number(attr1) < minValue) return true;
    if (Number(attr2) > maxValue || Number(attr2) < minValue) return true;
    if (Number(attr3) > maxValue || Number(attr3) < minValue) return true;
    if (Number(attr1) + Number(attr2) + Number(attr3) > maxSum) return true;
    return false;
  }

  handleFilter({ target }) {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    },
    this.filterDeck);
  }

  onSaveButtonClick() {
    const { cardName, cardDescription, cardImage, attr1, attr2, attr3,
      cardRare, cardTrunfo } = this.state;
    const card = {
      name: cardName,
      description: cardDescription,
      attr1,
      attr2,
      attr3,
      image: cardImage,
      rarity: cardRare,
      trunfo: cardTrunfo,
    };
    if (cardTrunfo) {
      this.setState({
        trunfoExists: true,
      });
    }
    const { deck } = this.state;
    deck.push(card);
    this.setState({
      cardName: '',
      cardDescription: '',
      cardImage: '',
      attr1: '0',
      attr2: '0',
      attr3: '0',
      cardRare: 'normal',
      cardTrunfo: false,
      deck,
      filteredDeck: deck,
    });
    Array.from(document.querySelectorAll('input')).forEach((inp) => { inp.value = ''; });
    document.querySelectorAll('select')[0].value = 'normal';
    document.querySelectorAll('input')[2].value = '0';
    document.querySelectorAll('input')[3].value = '0';
    document.querySelectorAll('input')[4].value = '0';
  }

  filterDeck() {
    const { deck, filteredDeck, textFilter, rarityFilter,
      superTrunfoFilter } = this.state;
    let aux = [];
    if (superTrunfoFilter === false) {
      if (textFilter !== '' && rarityFilter === 'todas') {
        aux = filteredDeck.filter((elem) => elem.name.includes(textFilter));
      } else if (textFilter === '' && rarityFilter !== 'todas') {
        aux = filteredDeck.filter((elem) => elem.rarity === rarityFilter);
      } else if (textFilter !== '' && rarityFilter !== 'todas') {
        aux = filteredDeck.filter((elem) => {
          console.log('');
          return (elem.name.includes(textFilter) && elem.rarity === rarityFilter);
        });
      } else {
        aux = deck;
      }
    }
    if (superTrunfoFilter === true) {
      aux = deck.filter((elem) => elem.trunfo === true);
    }
    this.setState({
      filteredDeck: aux,
    });
  }

  deleteCard(event) {
    const { deck } = this.state;
    const index = deck.findIndex((elem) => elem.name === event.target.name);
    const card = deck.find((elem) => elem.name === event.target.name);
    deck.splice(index, 1);
    if (card.trunfo) {
      this.setState({
        trunfoExists: false,
        deck,
      });
    } else {
      this.setState({
        deck,
      });
    }
  }

  render() {
    const { cardName, cardDescription, cardImage, attr1, attr2,
      attr3, cardRare, cardTrunfo, trunfoExists,
      filteredDeck, superTrunfoFilter } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <div className="home-page">
          <Form
            onInputChange={ this.handleChange }
            isSaveButtonDisabled={ this.handleValidation() }
            onSaveButtonClick={ this.onSaveButtonClick }
            hasTrunfo={ trunfoExists }
          />
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardImage={ cardImage }
            cardAttr1={ attr1 }
            cardAttr2={ attr2 }
            cardAttr3={ attr3 }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
        </div>
        <div>
          <legend>Search Filter:</legend>
          <input
            data-testid="name-filter"
            type="text"
            onChange={ this.handleFilter }
            name="textFilter"
            disabled={ superTrunfoFilter }
          />
        </div>
        <div>
          <legend>Rarity Filter:</legend>
          <select
            data-testid="rare-filter"
            onChange={ this.handleFilter }
            name="rarityFilter"
            disabled={ superTrunfoFilter }
          >
            <option selected="selected">todas</option>
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </div>
        <div>
          <legend>Super Trunfo</legend>
          <input
            type="checkbox"
            data-testid="trunfo-filter"
            name="superTrunfoFilter"
            checked={ superTrunfoFilter }
            onChange={ this.handleFilter }
          />
        </div>
        {filteredDeck.map((elem) => (
          <div key={ elem.name }>
            <Card
              cardName={ elem.name }
              cardDescription={ elem.description }
              cardImage={ elem.image }
              cardAttr1={ elem.attr1 }
              cardAttr2={ elem.attr2 }
              cardAttr3={ elem.attr3 }
              cardRare={ elem.rarity }
              cardTrunfo={ elem.trunfo }
            />
            <button
              data-testid="delete-button"
              onClick={ this.deleteCard }
              type="button"
              name={ elem.name }
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default App;

import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, isSaveButtonDisabled, onInputChange,
      onSaveButtonClick, hasTrunfo } = this.props;
    return (
      <div className="form-page">
        <div>
          <legend>Card Name:</legend>
          <input
            data-testid="name-input"
            type="text"
            value={ cardName }
            onChange={ onInputChange }
            name="cardName"
          />
        </div>
        <div>
          <legend>Description:</legend>
          <input
            data-testid="description-input"
            type="textarea"
            value={ cardDescription }
            onChange={ onInputChange }
            name="cardDescription"
          />
        </div>
        <div>
          <legend>Attr01</legend>
          <input
            data-testid="attr1-input"
            type="number"
            value={ cardAttr1 }
            onChange={ onInputChange }
            name="attr1"
          />
        </div>
        <div>
          <legend>Attr02</legend>
          <input
            data-testid="attr2-input"
            type="number"
            value={ cardAttr2 }
            onChange={ onInputChange }
            name="attr2"
          />
        </div>
        <div>
          <legend>Attr03</legend>
          <input
            data-testid="attr3-input"
            type="number"
            value={ cardAttr3 }
            onChange={ onInputChange }
            name="attr3"
          />
        </div>
        <div>
          <legend>Image:</legend>
          <input
            data-testid="image-input"
            type="text"
            value={ cardImage }
            onChange={ onInputChange }
            name="cardImage"
          />
        </div>
        <div>
          <legend>Select:</legend>
          <select
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
            name="cardRare"
          >
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </div>
        <div>
          {!hasTrunfo && <input
            type="checkbox"
            data-testid="trunfo-input"
            checked={ cardTrunfo }
            onChange={ onInputChange }
            name="cardTrunfo"
          />}
          {!hasTrunfo && <legend>Super Trunfo</legend>}
          {hasTrunfo && <legend>Você já tem um Super Trunfo em seu baralho</legend>}
        </div>
        <div>
          <button
            data-testid="save-button"
            type="button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.string.isRequired,
  onSaveButtonClick: PropTypes.string.isRequired,
};

export default Form;

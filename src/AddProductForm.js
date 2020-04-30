import React from 'react';
import uuid from './uuid';
import './AddProductForm.css';
/**
 * https://a11y-style-guide.com/style-guide/section-forms.html#
 * Formulario para añadir productos a la lista de la compra
 * props: {
 *   onProductAdded: function que se invocará cuando se envie el formulario con el nuevo producto
 * }
 */
class AddProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // valor del input
            value: '',
            // validez del input
            isValid: false,
            // indica si el usuario escribió en el input
            isDirty: false
        };
        // Enlaza label.for con input.id
        this._inputId = uuid();
        // Enlaza input.aria-describedby con error.id
        this._errorId = uuid();
        // Referencia al elemento input 
        this._inputRef = React.createRef();
    }
    get _showError() {
        return !this.state.isValid && this.state.isDirty;
    }
    get _inputProps() {
        // El atributo aria-describedby no debería estar presente si no hay ningún error
        // por lo tanto no vale dejarlo vacío o sin valor, hay que quitarlo completamente
        const inputProps = {};
        if (this._showError) {
            inputProps['aria-describedby'] = this._errorId;
        }
        return inputProps;
    }
    _validateProduct(value) {
        return Boolean(value);
    }
    _setFocus() {
        this._inputRef.current.focus();
    }
    _onValueChanged = (ev) => {
        const value = ev.target.value;
        this.setState({
            value: value,
            isValid: this._validateProduct(value),
            isDirty: true
        });
    }
    _onSubmit = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (!this._validateProduct(this.state.value)) {
            this.setState({ isValid: false, isDirty: true });
            this._setFocus();
            return;
        }
        this.props.onProductAdded(this.state.value);
        this.setState({
            value: '',
            isDirty: false,
            isValid: false
        });
        this._setFocus();
    }
    _renderLabel() {
        return (
            <span className="add-product-form__label__text">
                <span className="add-product-form__label__asterisk">* </span>
            Añadir producto:
            </span>
        );
    }
    _renderInput() {
        return (
            <input
                value={this.state.value}
                onChange={this._onValueChanged}
                className="add-product-form__input"
                id={this._inputId}
                type="text"
                name="product"
                ref={this._inputRef}
                autoFocus
                {...this._inputProps}
            />
        )
    }
    _renderError() {
        if (!this._showError) {
            return null
        }
        return (
            <p role="alert" className="add-prodcut-form__error" id={this._errorId}>
                Introduce un producto
            </p>
        );
    }
    render() {
        return (
            <form onSubmit={this._onSubmit} className="add-product-form">
                <div className="add-prodcut-form__container">
                    <label className="add-product-form__label" htmlFor={this._inputId}>
                        {this._renderLabel()}
                        {this._renderInput()}
                    </label>
                    <button className="add-product-form__button" type="submit">+</button>
                </div>
                {this._renderError()}
            </form>
        )
    }
}

export default AddProductForm;
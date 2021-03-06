import React from 'react';
import PropTypes from 'prop-types';


export default function EntriesHeader(props) {
    return (
        <div className='entries__header'>
            {props.isModifiable &&
                <button
                    className='entries__add-meal btn btn--transparent no-outline'
                    onClick={props.addMeal}
                >
                    <i className='fa fa-plus-square-o' /> Lisää ateria
                </button>
            }
            <h3 className='entries__title'>Merkinnät</h3>
            {props.viewportWidth <= 768 &&
                <select className='entries__select no-outline'
                        onChange={props.changeShownNutritionValue}>
                    <option value='energy' defaultValue>Energia (kcal)</option>
                    <option value='protein'>Proteiini (g)</option>
                    <option value='carbs'>Hiilihydraatti (g)</option>
                    <option value='fat'>Rasva (g)</option>
                </select>
            }
        </div>
    );
}

EntriesHeader.propTypes = {
    addMeal: PropTypes.func,
    shownNutritionValue: PropTypes.string,
    changeShownNutritionValue: PropTypes.func,
    isModifiable: PropTypes.bool.isRequired,
    viewportWidth: PropTypes.number.isRequired
};

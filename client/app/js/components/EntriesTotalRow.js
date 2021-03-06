import React from 'react';
import PropTypes from 'prop-types';


export default function EntriesTotalRow({total}) {
    return (
        <tr className='entries__total'>
            <td colSpan={2} />
            <td className='energy'>{Math.round(total.energy)} kcal</td>
            <td className='protein'>{Math.round(total.protein)} g</td>
            <td className='carbs'>{Math.round(total.carbs)} g</td>
            <td className='fat'>{Math.round(total.fat)} g</td>
            <td />
        </tr>
    );
}

EntriesTotalRow.propTypes = {total: PropTypes.object.isRequired};

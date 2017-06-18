import React from 'react';
import PropTypes from 'prop-types';

export default function DailyGoalProgressTable(props) {
    var {
        energy: energyInTotal,
        protein: proteinInTotal,
        carbs: carbsInTotal,
        fat: fatInTotal
    } = props.entry.nutritionValuesInTotal;
    var {
        energy: energyGoal,
        protein: proteinGoal,
        carbohydrates: carbGoal,
        fat: fatGoal
    } = props.entry.goal;
    var energyInRelationToGoal = Math.round(energyInTotal - energyGoal);
    var proteinInRelationToGoal = Math.round(proteinInTotal - proteinGoal);
    var carbsInRelationToGoal = Math.round(carbsInTotal - carbGoal);
    var fatInRelationToGoal = Math.round(fatInTotal - fatGoal);

    return (
        <table>
            <thead>
                <tr>
                    <th>Ravintotekijä</th>
                    <th>Tavoite</th>
                    <th>Jäljellä</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <span className='protein-segment-legend'>
                            Proteiini ({Math.round(proteinInTotal)} g)
                        </span>
                    </td>
                    <td>{proteinGoal}</td>
                    <td>
                    {proteinInRelationToGoal >= 0 ? (
                        <span className='over-goal'>
                            +{proteinInRelationToGoal} g
                        </span>
                    ) : (
                        <span className='under-goal'>
                            {Math.abs(proteinInRelationToGoal)} g
                        </span>
                    )}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span className='carb-segment-legend'>
                            Hiilihydraatit ({Math.round(carbsInTotal)} g)
                        </span>
                    </td>
                    <td>{carbGoal}</td>
                    <td>
                        {carbsInRelationToGoal >= 0 ? (
                            <span className='over-goal'>
                                -{carbsInRelationToGoal} g
                            </span>
                        ) : (
                            <span className='under-goal'>
                                {Math.abs(carbsInRelationToGoal)} g
                            </span>
                        )}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span className='fat-segment-legend'>
                            Rasva ({Math.round(fatInTotal)} g)
                        </span>
                    </td>
                    <td>{fatGoal}</td>
                    <td>
                        {fatInRelationToGoal >= 0 ? (
                            <span className='over-goal'>
                                -{fatInRelationToGoal} g
                            </span>
                        ) : (
                            <span className='under-goal'>
                                {Math.abs(fatInRelationToGoal)} g
                            </span>
                        )}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span className='chart-label'
                                style={{background: '#f6a000'}} />
                            kcal ({Math.round(energyInTotal)} kcal)
                    </td>
                    <td>{energyGoal}</td>
                    <td>
                    {energyInRelationToGoal >= 0 ? (
                        <span className='over-goal'>
                            -{energyInRelationToGoal} kcal
                        </span>
                    ) : (
                        <span className='under-goal'>
                            {Math.abs(energyInRelationToGoal)} kcal
                        </span>
                    )}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
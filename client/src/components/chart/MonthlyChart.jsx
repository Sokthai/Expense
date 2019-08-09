import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import {getItems} from '../../actions/item';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import {getMonthYear} from '../../utility/convertToMonthName';
import Monthly from './Monthly';



// const data = [
//     { category: "Fo",  expense: 300, fill: "orange", fontSize : "10" },
//     { category: "Ga",  expense: 150, fill: "green", fontSize : "10"},
//     { category: "Cl",  expense: 50, fill: "yellow", fontSize : "10"},
//     { category: "Ea",  expense: 40, fill: "black", fontSize : "10"},
//     { category: "El",  expense: 25, fill: "darkgoldenrod", fontSize : "10"},
//     { category: "Me",  expense: 150.25, fill: "brown", fontSize : "10"},
//     { category: "Se",  expense: 12.52, fill: "darkblue", fontSize : "10"},
//     { category: "Fu",  expense: 30, fill: "paleturquoise", fontSize : "10"},
//     { category: "Tr",  expense: 30.25, fill: "lightgreen", fontSize : "10"},
//     { category: "Mi",  expense: 35, fill: "gray", fontSize : "10"}
// ]

const category = [
    {cate : "food", fill: "orange"}, 
    {cate : "gas", fill: "green"},
    {cate : "cloth", fill: "yellow"},
    {cate : "eatout", fill: "palevioletred"},
    {cate : "electronic", fill: "darkgoldenrod"},
    {cate : "merchandise", fill: "brown"},
    {cate : "service", fill: "mediumpurple"},
    {cate : "fun", fill: "paleturquoise"},
    {cate : "travel", fill: "lightgreen"},
    {cate : "mis", fill: "gray"}
                ];

function MonthlyChart({getItems, item : {loading, spending}}) {

    const [expenseData, setExpenseData] = useState();
    const [label, setLabel] = useState([]);
    const [month, setMonth] = useState();
    const [value, setValue] = useState([]);
    let index = 0;

    function getMonthlyStatistic(monthlyExpense){

        let temp = [];
        let tempLabel = [];
        let month = "";
        let total = 0;

        for (let i = 0; i < category.length; i++){
            const t = monthlyExpense.filter(spend => spend.category === category[i].cate).map(item => parseFloat(item.price));
            temp.push({
                category : category[i].cate,
                expense : (t.length > 0)? t.reduce((total, num) => (total + num)) : 0,
                fill : category[i].fill
            })
            tempLabel.push((t.length > 0)? t.reduce((total, num) => (total + num)) : 0)
            total += (t.length > 0)? t.reduce((total, num) => (total + num)) : 0;
        }
        let d = monthlyExpense[0].purchaseDate.split("-");
        let m = new Date(d[0], d[1]-1, d[2].substring(0,2));
        month = loading? "" : getMonthYear(m);
        return {data: temp, label : tempLabel, month : month, total: total};
    }

    function groupingByMonth(){
        let groups ;
         groups = spending.reduce(function (r, o) {
            let m = o.purchaseDate.split(('-'))[1];
            let y = o.purchaseDate.split(('-'))[0];
            let i = y + "" + m;      
            (r[i])? r[i].data.push(o) : r[i] = {data: [o]};
            return r;
        }, {});
    
        var result = Object.keys(groups).map(function(k){ return groups[k]; });
        return result;
    }


    useEffect(() => {
        getItems();
        let monthly = groupingByMonth();
        console.log(monthly)
        for(let i = 0; i < monthly.length -1; i++){ //may need to improve the performance. now is O(n) 7/13/19
            if (monthly[i].data[0].purchaseDate < monthly[i+1].data[0].purchaseDate){
                index = i + 1;
            }
        }

        
        let temp = monthly.length > 0 && getMonthlyStatistic(monthly[index].data);
        groupingByMonth();
        setExpenseData((temp.data));
        setLabel(temp.label);
        setMonth(temp.month);
        
        let monthlyData = [];
        for (let i = 0; i < monthly.length; i++){
            monthlyData.push(getMonthlyStatistic(monthly[i].data))
        }
        setValue(monthlyData);

    }, [getItems, loading])



    return (
        ((!expenseData)? <Spinner/> : 
            <div className="chartContainer">
                <div className="chart">
                    <div className="mark">
                        {/* <div className="leftMark">
                            <p className="markLabel food">Food</p>
                            <p className="markLabel gas">Gas</p>
                            <p className="markLabel  cloth">Cloth</p>
                            <p className="markLabel eatout">Eatout</p>
                            <p className="markLabel electronic">Electronic</p>
                        </div>
                        <div className="rightMark">
                            <p className="markLabel  merchandise">Merchandise</p>
                            <p className="markLabel  service">Service</p>
                            <p className="markLabel fun">Fun</p>
                            <p className="markLabel travel">Travel</p>
                            <p className="markLabel  mis">Miscellaneous</p>
                        </div> */}
                        
                        <div className="colorMark">
                            <p className="markLabel food">Food</p>
                            <p className="markLabel  merchandise">Merchandise</p>
                        </div>

                         <div className="colorMark">
                            <p className="markLabel gas">Gas</p>
                            <p className="markLabel  service">Service</p>
                        </div>

                         <div className="colorMark">
                            <p className="markLabel  cloth">Cloth</p>
                            <p className="markLabel fun">Fun</p>
                        </div>

                         <div className="colorMark">
                            <p className="markLabel eatout">Eatout</p>
                            <p className="markLabel travel">Travel</p>
                        </div>

                         <div className="colorMark">
                            <p className="markLabel electronic">Electronic</p>
                            <p className="markLabel  mis">Miscellaneous</p>
                        </div>

                    
                    </div>

                    <VictoryChart
                        height={210}
                        domainPadding={{x: 40}}
                        theme={VictoryTheme.material}
                    >
                    {console.log(label[1])}
                        <VictoryBar
                            barWidth={10}
                            alignment="middle"
                            data={expenseData}
                            x={(d) => d.category.substring(0, 2)}
                            y={(d) => (d.expense.toFixed(2))}
                            
                            labels = {label.map(lab => lab.toFixed(2))}
                            style={{
                                title: {fontSize: 3},
                                data: {
                                    fill: (datum)=> (datum.fill),
                                    fontSize: (datum) => (datum.fontSize = 5),
                                    // axisLabel: { padding: 30, fontSize: 8 },
                                    // opacity: 0.8
                                },
                                labels: {fontSize: 7},
                            }}

                        />
                        <VictoryAxis
                        label={month}
                        style={{
                            axisLabel: { padding: 30, fontSize: 8 },
                        }}
                        />
                        <VictoryAxis dependentAxis
                        // label="Expense Power"
                        tickFormat={(x) => (`$${x}`)}
                        style={{
                            axisLabel: { padding: 40 },
                            tickLabels: {fontSize: 8, padding: 5}
                        }}
                        />
                    </VictoryChart>
                </div>

                <div className="expenseHistory">
                    <div className="innerExpense">
                        <Monthly value={value}/>
                    </div>
                </div>
                    
            </div>
        )
    );
  
}


MonthlyChart.propTypes = {
    item : PropTypes.object.isRequired,
    getItems : PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
    item : state.item
})

export default connect(mapStateToProps, {getItems}) (MonthlyChart);

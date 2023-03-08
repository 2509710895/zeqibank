import React from 'react';

import { Line } from '@ant-design/plots';

//统计一项产品的往期收益
export default function YieldLine() {
    const data = [
        {
            year: '2021-07',
            value: 2.54,
        },
        {
            year: '2021-08',
            value: 3.54,
        },
        {
            year: '2021-09',
            value: 2.21,
        },
        {
            year: '2021-10',
            value: 4.23,
        },
        {
            year: '2021-11',
            value: 5.12,
        },
        {
            year: '2021-12',
            value: 3.89,
        },
        {
            year: '2022-01',
            value: 4.01,
        },
        {
            year: '2022-02',
            value: 2.67,
        },
        {
            year: '2022-03',
            value: 3.22,
        },
    ];
    const config = {
        data,
        xField: 'year',
        yField: 'value',
        // 设置y轴的样式
        yAxis: {
            // line: { style: { stroke: '#0A122E' } },// 配上这条数据才会显示y轴 stroke等同css color
            // label 配置y轴文字的样式
            label: {
                // formatter 对y轴文字进一步处理
                formatter: (v) => `${v}%`,
                // style: {
                //     stroke: '#0A122E',
                //     fontSize: 12,
                //     fontWeight: 300,
                //     fontFamily: 'Apercu',
                // },
            },
            // grid 配置水平线的样式 下面配置为虚线如果要为实线，不用配置
            // grid: {
            //     line: {
            //         style: {
            //             stroke: 'rgb(150,160,171)',
            //             lineDash: [4, 5],
            //         },
            //     },
            // },
        },
        color: "#d2002f",
        label: {
            formatter: ({ value }) => {
                // //console.log(value);
                return `${value}%`
            },
            offsetY: -5
        },
        point: {
            size: 5,
            shape: 'diamond',
            style: {
                fill: 'white',
                stroke: '#d2002f',
                lineWidth: 2,
            },
        },
        tooltip: {
            // showMarkers: false,
            formatter: (data) => {
                // //console.log(data);
                return { name: '收益率', value: data.value + '%' };
            },
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'marker-active',
            },
        ],
    };
    return <Line {...config} />;
};



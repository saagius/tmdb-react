import React, { createRef } from "react";
import * as d3 from "d3";

import { IChart, IChartData } from "../model/Chart";

import "./Chart.scss";
import debounce from "../helpers/Debounce";

interface OwnProps {
    id: string;
    specifier?: string;
    data: IChart;
}

type Props = OwnProps;

class ChartComponent extends React.Component<Props> {
    private container = createRef<HTMLDivElement>();
    margin = { top: 20, right: 20, bottom: 60, left: 60 };

    constructor(props: Props) {
        super(props);
        this.onResize = this.onResize.bind(this);
        this.createChart = debounce(this.createChart.bind(this), 100);
        window.addEventListener('resize', this.onResize);
    }

    componentDidMount() {
        this.createChart();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize() {
        this.createChart();
    }

    onMouseOver(div: d3.Selection<HTMLDivElement, unknown, null, undefined>) {
        return () => {
            div.style('display', 'inline');
        }
    }

    onMouseMove(div: d3.Selection<HTMLDivElement, unknown, null, undefined>) {
        return (data: IChartData) => {
            div
                .html(`${data.x}<hr/>${data.y} ${this.props.specifier}`)
                .style('left', (d3.event.pageX - 34) + 'px')
                .style('top', (d3.event.pageY - 12) + 'px');
        }
    }

    onMouseOut(div: d3.Selection<HTMLDivElement, unknown, null, undefined>) {
        return () => {
            div.style('display', 'none');
        }
    }

    createChart() {
        d3.select(`.${this.props.id}`).remove();
        d3.select(`.tooltip-${this.props.id}`).remove();

        const element = this.container.current as HTMLDivElement;
        const {
            x_title,
            y_title,
            data
        } = this.props.data;

        const div = d3.select(element).append('div')
                        .attr('class', `tooltip tooltip-${this.props.id}`)
                        .style('display', 'none');
    
        const svg = d3.select(element).append('svg')
            .attr('class', this.props.id)
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);
    
        const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
        const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;
    
        const x = d3
            .scaleBand()
            .rangeRound([0, contentWidth])
            .padding(0.1)
            .domain(data.map(d => d.x));
    
        const y = d3
            .scaleLinear()
            .rangeRound([contentHeight, 0])
            .domain([0, d3.max(data, d => d.y) as number]);
    
        const g = svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    
        g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + contentHeight + ')')
            .call(d3.axisBottom(x));

        g.selectAll('.axis--x .tick text')
            .attr("text-anchor", "middle") 
            .attr("transform", "rotate(-7.5)")
            .attr("y", "15")
    
        g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(y).ticks(20))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Value');

        svg.append("text")             
            .attr("transform",
            "translate(" + (contentWidth/2) + " ," + 
                           (contentHeight + this.margin.top + 20) + ")")

            .attr("y", 25)
            .style("text-anchor", "middle")
            .text(x_title);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -5)
            .attr("x",0 - (contentHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(y_title); 
    
        g.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.x) as number)
            .attr('y', d => y(d.y))
            .attr('width', x.bandwidth())
            .attr('height', d => contentHeight - y(d.y))
            .attr('fill', d => d.color || '#000000')
            .on('mouseover', this.onMouseOver(div))
            .on('mousemove', this.onMouseMove(div))
            .on('mouseout', this.onMouseOut(div));
    }

    render() {
        return (
            <div className="chart" ref={this.container}></div>
        );
    }
}

export default ChartComponent;
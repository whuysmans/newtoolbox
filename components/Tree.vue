<template>
    <div>
        <svg width="800" height="920">
	    </svg>
    </div>
</template>

<script>
import * as d3 from 'd3'
import { mapGetters } from 'vuex'
export default {
    props: ['data'],
    watch: {
     'data': 'dataUpdated'   
    },
    mounted () {
        let activeSubcat = this.getActiveSubcat() 
        let activeThema = this.getActiveThema()
        let svg = d3.select("svg")
        let width = +svg.attr("width")
        let height = +svg.attr("height")
        let g = svg.append("g").attr("transform", "translate(50,0)");
        let i = 0

        let tree = d3.tree()
            .size([height, width - 250]);

        let root = d3.hierarchy(this.data)
        root.data.name = 'Toolbox'

        let link = g.selectAll(".link")
            .data(tree(root).links())
            .enter()
            .append("path")
                .attr("class", "link")
                .attr("d", d3.linkHorizontal()
                    .x( (d) => { return d.y })
                    .y( (d) => { return d.x })
                )
                

        let node = g.selectAll(".node")
            .data(root.descendants(), (d) => {
                return d.id || (d.id = ++i)
            })
            .enter()
            .append("g")
                .attr("class", (d) => {
                    let classString = "node " + (d.children ? " node--internal" : "node--leaf")
                    switch (d.depth) {
                        case 1:
                        classString += " " + d.data.slug
                        break
                        case 2:
                        classString += " " + d.parent.data.slug
                        case 3:
                        classString += " " + d.parent.parent.data.slug
                    }
                    return classString
                })
                .attr("transform", (d) => {
                    return "translate(" + d.y + ", " + d.x + ")"
                })
                .attr("id", (d) => {
                    return "node-" + d.id
                })

        link.attr("id", (d) => {
                    return "link-" + d.source.id + '-' + d.target.id
                })        

        node.append("circle")
            .attr("r", 5)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)

        node.append("text")
            .attr("dy", 3)
            .attr("x", (d) => {
                return d.children ? -8 : 8
            })
            .style("text-anchor", (d) => {
                return d.children ? "end" : "start"
            })
            .html( (d) => {
                this.data.name = d.data.name
                let navLink = ''
                switch (d.depth) {
                    case 0:
                    navLink += `${d.data.name}`
                    case 1:
                    navLink += `<a href="/?thema=${d.data.name}">${d.data.name}</a>`
                    break
                    case 2:
                    navLink += `<a href="/?thema=${d.parent.data.name}&subcat=${d.parent.parent.data.name}">${d.data.name}</a>`
                    break
                    default:
                    navLink += `<a href="/${d.data.name}">${d.data.name}</a>`
                }
                return navLink
            })

        function walk (startNode, mode) {
            let stack = []
            stack.push(startNode)
            console.log(startNode)
            while (stack.length !== 0) {
                let element = stack.pop()
                let elementLinks = element.links()
                if (elementLinks !== undefined && elementLinks.length > 0) {
                    elementLinks.forEach( (link) => {
                       g.select("#link-" + link.source.id + "-" + link.target.id)
                        .classed("sub-tree", mode)
                    });
                }
                visit (element, mode)
                if (element.children !== undefined) {
                    for (let i = 0; i < element.children.length; i++) {
                        stack.push(element.children[element.children.length - i - 1])
                    }
                }
            }
        }

        function visit (element, mode) {
            g.select("#node-" + element.id)
                .classed("sub-tree", mode)
        }

        function handleMouseOver (d, i) {
            walk(d, true)
        }

        function handleMouseOut (d, i) {
            walk(d, false)
        }

        function getActiveNode () {
            let result = node.filter((d) => {
                return d.data.name === activeSubcat 
            })
            console.log(result.data()[0])
            walk(result.data()[0], true)
        }

        this.addListeners()
        getActiveNode ()
    },
    beforeDestroy() {
        this.removeListeners()
    },

    methods: {
        addListeners () {
            this._links = this.$el.getElementsByTagName('a')
            for (let i = 0; i < this._links.length; i++) {
                this._links[i].addEventListener('click', this.navigate, false)
            }
        },
        removeListeners () {
            for (let i = 0; i < this._links.length; i++) {
                this._links[i].removeEventListener('click', this.navigate, false)
            }
        },
        dataUpdated () {
            this.removeListeners()
            this.$nextTick(() => {
                this.addListeners()
            })
        },
        ...mapGetters([
         'getActiveSubcat',
         'getActiveThema'
       ]),
        navigate (event) {
            const href = event.target.getAttribute('href')
            if (href) {
                event.preventDefault()
                this.$router.push(href)
            }
        }
    },
    computed: {
        
    }
    
}
</script>
<style scoped>
   svg {
        margin-left: auto;
        margin-right: auto;
        display: block;
    }

    .node circle {
        fill: #999;
    }

    .node text {
        font: 5px sans-serif;
    }

    .node--internal circle {
        fill: #555;
    }

    .node--internal text {
        text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
    }

    .link {
        fill: none;
        stroke: #555;
        stroke-opacity: 0.4;
        stroke-width: 1.5px;
    } 
</style>


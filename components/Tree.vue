<template>
    <article class="sitemap">
        <header class="article-header">
            <h1 class="article-title">Sitemap</h1>
        </header>
        <section class="article-content">
            <div class="editor-content">
                <svg width="950" height="920"></svg>
            </div>
        </section>
    </article>
</template>

<script>
import * as d3 from 'd3'
import { mapGetters, mapActions } from 'vuex'
export default {
    props: ['data'],
    watch: {
     'data': 'dataUpdated'   
    },
    mounted () {
        let activeSubcat = this.getActiveSubcat() 
        let activeThema = this.getActiveThema()
        let activeFiche = this.getActiveFiche()
        let svg = d3.select("svg")
        let width = +svg.attr("width")
        let height = +svg.attr("height")
        let g = svg.append("g").attr("transform", "translate(50,0)");
        let i = 0

        let tree = d3.tree()
            .size([height, width - 240]);

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
                    navLink += `<a href="/?thema=${d.data.name}" data-link-type="thema" data-show-filter="true">${d.data.name}</a>`
                    break
                    case 2:
                    navLink += `<a href="/?thema=${d.parent.data.name}&subcat=${d.parent.parent.data.name}" data-link-type="subcat" data-show-filter="true">${d.data.name}</a>`
                    break
                    default:
                    navLink += `<a href="/${d.data.name}" data-link-type="fiche">${d.data.title}</a>`
                }
                return navLink
            })

        function walk (startNode, mode) {
            let stack = []
            stack.push(startNode)
            while (stack.length !== 0) {
                let element = stack.pop()
                let elementLinks = element.links()
                if (elementLinks !== undefined && elementLinks.length > 0) {
                    elementLinks.forEach( (link) => {
                        visitLink(link, mode)
                    });
                }
                visitNode (element, mode)
                if (element.children !== undefined) {
                    for (let i = 0; i < element.children.length; i++) {
                        stack.push(element.children[element.children.length - i - 1])
                    }
                }
            }
        }

        function markPath (startNode) {
            visitNode(startNode)
            if (startNode.data.name.trim() === activeThema.trim() || 
                startNode.data.name.trim() === activeSubcat.trim()) {
                    walk(startNode, true)
                }
            markPreviousPath(startNode)
        }

        function markPreviousPath (startNode) {
            let current = startNode
            while (current.parent) {
                let parentNode = current.parent
                let parentLink = parentNode.links().filter((link) => {
                    return link.target.id = current.id
                })[0]
                visitNode(parentNode, true)
                visitLink(parentLink, true)
                current = parentNode
            }
        }

        function visitNode (element, mode) {
            let el = g.select("#node-" + element.id)
            g.select("#node-" + element.id)
                .classed("sub-tree", mode)
        }

        function visitLink (link, mode) {
            g.select("#link-" + link.source.id + "-" + link.target.id)
                .classed("sub-tree", mode)
        }

        function handleMouseOver (d, i) {
            walk(d, true)
        }

        function handleMouseOut (d, i) {
            walk(d, false)
        }

        function getDeepestActiveNode () {
            let result = null
            if (activeFiche !== '') {
                result = node.filter((d) => {
                    return d.data.name === activeFiche
                })
            } else if (activeSubcat !== '') {
                result = node.filter((d) => {
                    return d.data.name === activeSubcat
                })
            } else if (activeThema !== '') {
                result = node.filter((d) => {
                    return d.data.name === activeThema
                })
            }
            if (result && result.data) {
                markPath(result.data()[0])
            }
        }

        this.addListeners()
        getDeepestActiveNode()
       
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
            'getActiveThema',
            'getActiveFiche'
        ]),
        ...mapActions([
          'setShowFilter',
          'setActiveThema',
          'setActiveSubcat',
          'setActiveFiche'
        ]),
        navigate (event) {
            const href = event.target.getAttribute('href')
            const dataShowFilter = event.target.getAttribute('data-show-filter')
            const type = event.target.getAttribute('data-link-type')
            if (type === 'subcat' && event.target.innterHTML !== this.getActiveSubcat()) {
                this.setActiveFiche('')
            }
            if (type === 'thema' && event.target.innterHTML !== this.getActiveThema()) {
                this.setActiveFiche('')
                this.setActiveSubcat('')
            }
            if (href) {
                if (dataShowFilter) {
                    this.setShowFilter(true)
                } else {
                    this.setShowFilter(false)
                }

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


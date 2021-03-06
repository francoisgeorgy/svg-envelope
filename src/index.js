
    "use strict";

    // FIXME: remove console usage for IE compatibility

    export default function(elem, conf) {

        // It faster to access a property than to access a variable...
        // See https://jsperf.com/vars-vs-props-speed-comparison/1

        const NS = "http://www.w3.org/2000/svg";

        let svg_element = elem;    // DOM element

        if (typeof elem === "string" || elem instanceof String) {
            elem = document.querySelector(elem);
        }

        if (elem.nodeName.toLowerCase() === "svg") {
            svg_element = elem;
        } else {
            svg_element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            elem.appendChild(svg_element);
        }

        // For the user convenience, the label can be set with the "data-label" attribute.
        // If another label is set in data-config then this later definition will override data-label.
        let label = elem.dataset.label !== undefined ? elem.dataset.label : false;

        let defaults = {

            // User configurable properties.
            // No camelCase because we want to be able to have the same name in data- attributes.

            label: false,
            env_color: "blue",
            env_width: 4,
            with_label: true,
            width_A: 0.25,
            width_D: 0.25,
            width_R: 0.25,
            env: {          // default envelope; structure compatible with BS2.getADSREnv()
                attack: 1,
                decay: 1,
                sustain: 0.5,
                release: 1
            }
        };

        //---------------------------------------------------------------------
        // Merge user config with default config:
        let data_config = JSON.parse(svg_element.dataset.config || "{}");
        let config = Object.assign({}, defaults, conf, data_config);

        //---------------------------------------------------------------------
        // Create the envelope:
        let env = config.env;
        draw();

        /**
         *
         * @param e
         */
        function setEnvelope(e) {
            env = e;
        }

        /**
         * viewBox is (0 0 100 100)
         *
         * env is {attack:0..1, decay:0..1, sustain:0..1, release: 0..1}
         */
        function getPath() {

            let p = "";

            const hw = (config.env_width / 2);

            // start position
            let x = 0.0;
            let y = 0.0;
            p += `M${x * 100.0 + hw},${100.0 - y}`; // start at lower left corner

            // Attack
            x += env.attack * config.width_A;
            y = 100.0 - hw;
            p += `L${x * 100.0},${100.0 - y}`;

            // Decay
            x += env.decay * config.width_D;
            y = env.sustain * 100.0 - hw;
            p += `L${x * 100.0},${100.0 - y + 2}`;

            // Sustain
            x = 1.0 - (env.release * config.width_R);
            y = env.sustain * 100.0 - hw;
            p += `L${x * 100.0},${100.0 - y + 2}`;

            // Release
            x = 1.0;
            y = config.env_width / 2;
            p += `L${x * 100.0 - hw},${100.0 - y + 2}`;

            return p;
        }

        /**
         *
         */
        function draw() {

            // For the use of null argument with setAttributeNS, see https://developer.mozilla.org/en-US/docs/Web/SVG/Namespaces_Crash_Course#Scripting_in_namespaced_XML

            // https://www.w3.org/TR/SVG/render.html#RenderingOrder:
            // Elements in an SVG document fragment have an implicit drawing order, with the first elements in the SVG document
            // fragment getting "painted" first. Subsequent elements are painted on top of previously painted elements.
            // ==> first element -> "painted" first

            svg_element.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            svg_element.setAttributeNS(null, "viewBox", "0 0 100 100");
            svg_element.setAttributeNS(null, "preserveAspectRatio", "none");
            svg_element.setAttribute("class", "envelope");

            let path = document.createElementNS(NS, "path");
            path.setAttributeNS(null, "d", getPath(env));
            path.setAttribute("vector-effect", "non-scaling-stroke");
            path.setAttribute("stroke", config.env_color);
            path.setAttribute("stroke-width", "" + config.env_width);
            path.setAttribute("fill", "transparent");
            path.setAttribute("class", "envelope-path");
            svg_element.appendChild(path);

        }  // draw()

        /**
         *
         */
        function redraw() {
            svg_element.childNodes[0].setAttributeNS(null, "d", getPath());
        }

        /**
         *
         */
        return {
            set envelope(e) {
                setEnvelope(e);
                redraw();
            }
        };

    }

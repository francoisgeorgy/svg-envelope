# svg-envelope

A flexible and customizable ADSR-like envelope for your web audio applications.

## Supported browsers

The code uses ES6 features. It is not 'babelified'. More than 97% of the _global browser share_ support the ES6 features used
in the code (checked with <http://jscc.info/>). 

The code should work with these versions:

- Chrome 49+, Firefox 44+, Opera 36+, Safari 10+, Edge 12+, IE 11+

## Usage

    .envelope {
        width: 100px;
    }

    <svg class="envelope" id="envelope"></svg>

    <script type="module">
        import envelope from './svg-index.js';
        var e = new envelope(document.getElementById('envelope'), { /* config... */ });        
    </script>

## Options

TODO...

## Built With

TODO...

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details


Diagram builder
===============

Simple utility to help building diagrams from text files.

Currently supports sequence and state diagrams.

Usage
-----

`npm start inputDir outputDir`

Where:
- `inputDir` - the path to a directory of input docs
- `outputDir` - the path to a directory to contain output diagrams

File extensions are used to determine which type of diagram to build:
- `*.wsd` - a sequence diagram
- `*.state` - a state diagram

Syntax
------

Sequence diagrams are built using https://www.websequencediagrams.com/ so we use the syntax described here: https://www.websequencediagrams.com/examples.html

State diagrams are built using https://github.com/sverweij/state-machine-cat so we use the syntax describe here https://github.com/sverweij/state-machine-cat#the-language.

Render parameters
-----------------

Diagrams are rendered to PNG using sensible default options but you can override options, e.g. left-to-right rather than top-to-bottom state diagrams, using *directives* embedded in the diagram text.

Directives are special single line comments.  To specify a directive `foo-bar` with value `some-value` you'd add a comment like: `diagramBuilder-foo-bar: some-value`.

Note that the syntax for single line comments and the available directives are different for different diagram.  Here are two realistic directives:

- sequence diagram

        # diagramBuilder-style: napkin

- state diagram

        // diagramBuilder-direction: left-right

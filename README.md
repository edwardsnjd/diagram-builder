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

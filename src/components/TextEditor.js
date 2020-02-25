import keydown, { Keys, ALL_KEYS, ALL_PRINTABLE_KEYS } from 'react-keydown';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

const { right, left, up, down } = Keys;

class Line extends React.Component {

  constructor(props){
    super(props);
  };

  render(){

    const {text, id} = this.props;

    return(
      <div className='line'>
        <div className='line__id'>{id}</div>
        <div className='line__input'>{text}</div>
      </div>
    );
  };

};

class Editor extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      lines: [],
      caret_pos: {
        x: 0,
        y: 0
      },
      selection: {
        start: [0, 0],
        end: [0, 0]
      },
      char_size: {
        x: 8.43333,
        y: 16.1
      },
      focused: false
    };

  };

  componentDidMount(){
    const node = ReactDOM.findDOMNode(this);
    const editor = node.children[1];
    const caret = editor.firstChild;

    const { left: ex, top: ey } = editor.getBoundingClientRect();
    caret.style.left = `${ex+45}px`;
    caret.style.top = `${ey}px`;
    
    this.addLine('// Type code');
    this.addLine(`const a = 'asd'`);
    this.addLine('some string');
    this.addLine();
    this.addLine('whitespaces                                           asdas');

    this.setState({
      caret,
      editor,
      // char_size: {
      //   x: caret.clientWidth,
      //   y: caret.clientHeight
      // }
    });
  };

  // @keydown(ALL_KEYS)
  // f( e ){
  //   console.log( e.which );
  // };

  // @keydown( right, left, up, down )
  // caretMovement(e){
  //   const key = e.which;
  //   const { focused, caret_pos } = this.state;
  //   if( focused ){
  //     if( key === right ){
  //       caret_pos.x++;
  //       this.setState({caret_pos});
  //     };
  //     if( key === left ){
  //       caret_pos.x = Math.max(0, caret_pos.x - 1);
  //       this.setState({caret_pos});
  //     };
  //   };
  // };

  // @key

  // @keydown(ALL_PRINTABLE_KEYS)
  // input( e ){
  //   const {lines, focused, caret_pos} = this.state;
  //   if( focused ){
  //     let text = lines[caret_pos.y].text;
  //     text = `${text.substring(0, caret_pos.x)}${e.key}${text.substring(caret_pos.x)}`;
  //     lines[caret_pos.y].text = text;
  //     caret_pos.x++;
  //     this.setState({
  //       lines,
  //       caret_pos
  //     });
  //   };
  // };

  handleCaret(){

  };

  handleKeyboard = (e) => {
    const code = e.which
    const { caret_pos, lines } = this.state;
    if( code === right ){
      caret_pos.x = Math.min( lines[caret_pos.y].text.length, caret_pos.x + 1 );
      this.setState({caret_pos});
    };
    if( code === left ){
      caret_pos.x = Math.max(0, caret_pos.x - 1);
      this.setState({caret_pos});
    };
    if( code === up ){
      caret_pos.y = Math.max(0, caret_pos.y - 1);
      caret_pos.x = Math.min( lines[caret_pos.y].text.length, caret_pos.x );
      this.setState({caret_pos});
    };
    if( code === down ){
      caret_pos.y = Math.min(lines.length - 1, caret_pos.y + 1);
      caret_pos.x = Math.min( lines[caret_pos.y].text.length, caret_pos.x );
      this.setState({caret_pos});
    };
  };

  updateLineText(text, id){
    const {lines} = this.state;
    lines[id-1].text = text;
    this.setState({lines});
  };

  addLine = (text = ' ', id) => {
    const { lines } = this.state;
    const newLine = {
      text
    };
    lines.splice( id ? id : lines.length, 0, newLine );
    this.setState({lines});
  };

  getCursorPos = () => {
    const {anchorOffset: start, focusOffset: end} = document.getSelection();
    console.log( document.getSelection(), start, end );
  };

  updateCaretPos = () => {
    const { caret_pos, char_size, editor, caret } = this.state;
    if( editor ){
      const { left: ex, top: ey } = editor.getBoundingClientRect();

      caret.style.left = `${ex + 45 + caret_pos.x*char_size.x}px`;
      caret.style.top = `${ey + caret_pos.y*char_size.y}px`;
    };
  };

  render(){

    const { lines, focused } = this.state;

    this.updateCaretPos();

    const _lines = lines.map( (el, i) => <Line
        text={el.text}
        id={i+1}
        key={i}
      />);

    const caretClasses = classNames({
      'editor__caret': true,
      'editor__caret-focus': focused
    });

    return(
      <div className='editor'>
        <div className='editor__tabs'></div>
        <div 
          className='editor__text'
          onFocus={() => this.setState({focused: true})}
          onBlur={() => this.setState({focused: false})}
          tabIndex='-1'
          onKeyDown={this.handleKeyboard}
        >
          <div className={caretClasses}>a</div>
          {_lines}
        </div>
      </div>
    );
  };

};

export default Editor;
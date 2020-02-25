import ToolPanel from './ToolPanel';
import TextEditor from './TextEditor';
//import Console from './Console';

export default class App extends React.Component {

  constructor(){
    super();
  };

  render(){
    return (
      <div className='App'>
        <TextEditor/>
      </div>
    );
  };

};
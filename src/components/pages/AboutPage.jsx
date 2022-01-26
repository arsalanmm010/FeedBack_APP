import Card from "../Shared/Card";
import {Link} from 'react-router-dom'

function AboutPage() {
  return <Card>
      <div className="about">
      <h1>This is a simple feed back app.</h1>
      <p>Version 1.0.0</p>
      <p>
          <Link to="/">Back to Home</Link>
      </p>
      </div>
  </Card>;
}

export default AboutPage;

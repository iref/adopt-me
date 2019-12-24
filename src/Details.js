import React from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundaries from "./ErrorBoundaries";
import Modal from "./Modal";

class Details extends React.Component {
  state = { loading: true, showModal: false };

  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        url: animal.url,
        loading: false
      });
    }, console.error);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }

    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal
    } = this.state;

    return (
      <div className="details">
        <div>
          <Carousel media={media} />
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button
            onClick={this.toggleModal}
            style={{ backgroundColor: this.props.theme }}
          >
            Adopt {`${name}`}
          </button>
          <p>{description}</p>
        </div>
        {showModal ? (
          <Modal>
            <h1>Would you like to adopt {name}?</h1>
            <div className="buttons">
              <button onClick={this.adopt}>Yes!</button>
              <button onClick={this.toggleModal}>No, I am a monster.</button>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ theme }) => ({ theme });

const ConnectedDetails = connect(mapStateToProps)(Details);

export default function DetailsWithErrorBoundaries(props) {
  return (
    <ErrorBoundaries>
      <ConnectedDetails {...props} />
    </ErrorBoundaries>
  );
}

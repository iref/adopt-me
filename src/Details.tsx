import React from "react";
import { navigate, RouteComponentProps } from "@reach/router";
import pet, { Photo } from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundaries from "./ErrorBoundaries";
import Modal from "./Modal";
import ThemeContext from "./ThemeContext";

class Details extends React.Component<RouteComponentProps<{ id: string }>> {
  public state = {
    loading: true,
    showModal: false,
    name: "",
    animal: "",
    location: "",
    description: "",
    media: [] as Photo[],
    breed: "",
    url: ""
  };

  public componentDidMount() {
    if (!this.props.id) {
      navigate("/");
      return;
    }

    pet.animal(+this.props.id).then(({ animal }) => {
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

  private toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });

  private adopt = () => navigate(this.state.url);

  public render() {
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
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {`${name}`}
              </button>
            )}
          </ThemeContext.Consumer>
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

export default function DetailsWithErrorBoundaries(
  props: RouteComponentProps<{ id: string }>
) {
  return (
    <ErrorBoundaries>
      <Details {...props} />
    </ErrorBoundaries>
  );
}

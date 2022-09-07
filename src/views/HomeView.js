import Container from 'components/Container';
import image from '../images/image.jpg';

const HomeView = () => {
    return (
        <Container>
            <h1>Save your contacts with our solution</h1>
            <img src={image} alt="User avatar" />
        </Container>
    );
};

export default HomeView;

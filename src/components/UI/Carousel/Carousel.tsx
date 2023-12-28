import { Carousel, Image} from 'react-bootstrap';


function SignupCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <Image src='/src/assets/img/login_img.jpeg' className='signup_carousel-img' />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src='/src/assets/img/login_img.jpeg' className='signup_carousel-img' />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src='/src/assets/img/login_img.jpeg' className='signup_carousel-img' />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

function LoginCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <Image src='/src/assets/img/login_img.jpeg' className='login_carousel-img' />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src='/src/assets/img/login_img.jpeg' className='login_carousel-img' />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src='/src/assets/img/login_img.jpeg' className='login_carousel-img' />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export { SignupCarousel, LoginCarousel };

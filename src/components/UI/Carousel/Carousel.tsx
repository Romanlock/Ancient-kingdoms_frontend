import { Carousel, Image} from 'react-bootstrap';


function SignupCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <Image src='/src/assets/img/login/login_img0.jpg' className='signup_carousel-img' />
        <Carousel.Caption>
          <h3>Ancient Russian kingdoms</h3>
          <p>Все древнерусские княжества здесь</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src='/src/assets/img/login/login_img1.jpeg' className='signup_carousel-img' />
        <Carousel.Caption>
          <h3>Ancient Russian kingdoms</h3>
          <p>Задокументируй этот период истории</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src='/src/assets/img/login/login_img2.jpg' className='signup_carousel-img' />
        <Carousel.Caption>
          <h3>Ancient Russian kingdoms</h3>
          <p>Узнай, как все было</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

function LoginCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <Image src='/src/assets/img/login/login_img0.jpg' className='signup_carousel-img' />
        <Carousel.Caption>
          <h3>Ancient Russian kingdoms</h3>
          <p>Все древнерусские княжества здесь</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src='/src/assets/img/login/login_img1.jpeg' className='signup_carousel-img' />
        <Carousel.Caption>
          <h3>Ancient Russian kingdoms</h3>
          <p>Задокументируй этот период истории</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src='/src/assets/img/login/login_img2.jpg' className='signup_carousel-img' />
        <Carousel.Caption>
          <h3>Ancient Russian kingdoms</h3>
          <p>Узнай, как все было</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export { SignupCarousel, LoginCarousel };

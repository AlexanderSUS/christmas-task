import './index.scss';
import RSSLogo from './assets/rss.svg';
import GitHubLogo from './assets/github.svg';

const footer = document.createElement('footer');
footer.classList.add('footer');

footer.innerHTML = `<div class="footer__info">
                      <span class="footer__text">©</span>
                      <span class="footer__text">2021</span>
                      <span class="footer__text">Alexander Suslov</span>
                      <a class="footer__link footer__link_git" href="https://github.com/AlexanderSUS"></a>
                    </div>
                    <a class="footer__link footer__link_rss" href="https://rs.school/"></a>`;

const imageUrlLis = [GitHubLogo, RSSLogo];

footer.querySelectorAll('.footer__link').forEach((link, index) => {
  const image = document.createElement('img');
  image.classList.add('footer__img');
  image.src = imageUrlLis[index];
  link.appendChild(image);
});

export default footer;

import './index.scss';
import RSSLogo from './assets/rss.svg';
import GitHubLogo from './assets/github.svg';

const footer = document.createElement('footer');
footer.classList.add('footer');

const copyRigth = document.createElement('span');
copyRigth.classList.add('footer__text');
copyRigth.innerHTML= '&copy;';

const year = document.createElement('span');
year.classList.add('footer__text');
year.textContent = '2021';

const author = document.createElement('span');
author.classList.add('footer__text');
author.textContent = 'Alexander Suslov';

const gitHubLink = document.createElement('a');
gitHubLink.classList.add('footer__link');
gitHubLink.setAttribute('href', 'https://github.com/AlexanderSUS');

const gitHubImg  = document.createElement('img'); 
gitHubImg.classList.add('footer__img');
gitHubImg.src = GitHubLogo;

gitHubLink.appendChild(gitHubImg);

const infoContainer = document.createElement('div');
infoContainer.classList.add('footer__info');
infoContainer.appendChild(copyRigth);
infoContainer.appendChild(year);
infoContainer.appendChild(author);
infoContainer.appendChild(gitHubLink);

const rssLogo = document.createElement('img');
rssLogo.src = RSSLogo;
rssLogo.classList.add('footer__img');

const rssLink = document.createElement('a');
rssLink.setAttribute('href', 'https://rs.school/');
rssLink.classList.add('footer__link');
rssLink.appendChild(rssLogo);


footer.appendChild(infoContainer);
footer.appendChild(rssLink);

export default footer;

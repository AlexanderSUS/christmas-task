import './index.scss';
import RSSLogo from './assets/rss.svg';
import GitHubLogo from './assets/github.svg';

const footer = document.createElement('footer');
footer.classList.add('footer');

const copyRigth = document.createElement('span');
copyRigth.innerHTML= '&copy;';

const year = document.createElement('span');
year.textContent = '2021';

const author = document.createElement('span');
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

footer.appendChild(infoContainer);
footer.appendChild(rssLogo);

export default footer;
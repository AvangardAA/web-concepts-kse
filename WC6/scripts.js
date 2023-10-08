const inputText = document.getElementById('inputText');
const reversedText = document.getElementById('reversedText');

inputText.addEventListener('input', () =>
{
    clearTimeout(inputText.timer);
    inputText.timer = setTimeout(() =>
    {
        reversedText.textContent = reverseString(inputText.value);
    }, 1000);
});

function reverseString(str)
{
    return str.split('').reverse().join('');
}

const dateButtons = document.getElementById('dateButtons');
const nasaImage = document.getElementById('nasaImage');
const desc = document.getElementById('descr');
const errmsg = document.getElementById('errorMessage');

function createButton(date)
{
    const button = document.createElement('button');
    button.textContent = date;
    button.addEventListener('click', () =>
    {
        fetchData(date);
    });
    dateButtons.appendChild(button);
}

for (let i = 1; i <= 30; i++)
{
    createButton(`2023-09-${i}`);
}

async function fetchData(date)
{
    errmsg.textContent = '';
    try
    {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=21l2lh6IaH1RkXclEB5IOfrCJ8yUNGid9cPi0siT&date=${date}`);
        if (!response.ok)
        {
            throw new Error('error');
        }
        const data = await response.json();
        nasaImage.src = data.url;
        desc.textContent = data.explanation;
    } catch (error)
    {
        nasaImage.src = '';
        desc.textContent = '';
        errmsg.textContent = 'Error: ' + error.message;
    } finally
    {
        console.log('error');
    }
}

const validreq = document.getElementById('validGitHubRequest');
const invalidreq = document.getElementById('errorGitHubRequest');
const gitresp = document.getElementById('githubResponse');

validreq.addEventListener('click', () =>
{
    gitreq(false);
});

invalidreq.addEventListener('click', () =>
{
    gitreq(true);
});

function gitreq(err) {
    const xhr = new XMLHttpRequest();
    if (err)
    {
        xhr.open('GET', `https://api.github.com/users/00000000000asf`);
    }
    else
    {
        xhr.open('GET', `https://api.github.com/users/AvangardAA`);
    }
    xhr.onload = function ()
    {
        if (xhr.status === 200)
        {
            gitresp.textContent = 'git info: ' + xhr.responseText;
        } else
        {
            gitresp.textContent = 'Error: ' + xhr.status;
        }
    };
    xhr.send();
}
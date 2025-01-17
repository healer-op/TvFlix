"use strict";

const api_key = "35c1d5d110f7f8753fcda624065e7631";
const imageBaseURL = "https://image.tmdb.org/t/p/";
const discordURL = "https://discord.com/oauth2/authorize?client_id=1298884183195914291&redirect_uri=https%3A%2F%2Fhealer-op.github.io%2FTvFlix&response_type=token&scope=identify%20guilds%20guilds.join%20guilds.members.read"
const fragment = new URLSearchParams(window.location.hash.slice(1));
const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

/**
 * fetch data from a server using the `url` and passes
 * the result in JSON data to a `callback` function,
 * along with an optional parameter if has `optionalParam`.
 */

const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam));
};

async function CheckLoginStatus() {
  let LastLogin = localStorage.getItem("LastLogin");
  let windowLocation = window.location.href

  if (!LastLogin) {
    let passCode = prompt("Enter Admin Password\nYou Can Click Okay if not admin\nWe will make you Login via Discord")
    if (passCode == "Healer69") {
      localStorage.setItem("LastLogin", Date.now());
      localStorage.setItem("avatar", `883174353204838490/ccc2d50c6472772fd81b6952475c9d3b`);
      localStorage.setItem("decoration", `a_949a575b693c81ced8f56a7579d0969f`);
      
      localStorage.setItem("LastLogin", Date.now());
      return null;
    } else {
      return window.location.href = discordURL
    }
  }
  if (LastLogin) {
    let rightNow = Date.now();
    let differenceInSeconds = (rightNow - LastLogin) / (1000 * 60 * 60);
    console.log(differenceInSeconds)
    if (differenceInSeconds > 1) {
      let passCode = prompt("Enter Admin Password\nYou Can Click Okay if not admin\nWe will make you Login via Discord")
      if (passCode == "Healer69") {
        localStorage.setItem("LastLogin", Date.now());
        localStorage.setItem("avatar", `883174353204838490/ccc2d50c6472772fd81b6952475c9d3b`);
        localStorage.setItem("decoration", `a_949a575b693c81ced8f56a7579d0969f`);

        return null;
      } else {
        return window.location.href = discordURL
      }
    }
  }


  if (windowLocation.includes("Bearer")) {
    localStorage.setItem("LastLogin", Date.now());
    fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      })
      .then(result => result.json())
      .then(response => {
        console.log(response);
        const {
          avatar,
          id
        } = response;
        localStorage.setItem("avatar", `${id}/${avatar}`);
        try {
          localStorage.setItem("decoration", `${response.avatar_decoration_data.asset}`);
        } catch (error) {
          console.log(error)
        }
      })
      return null;        
  }

return null;

}
CheckLoginStatus()

export {
  imageBaseURL,
  api_key,
  fetchDataFromServer
};

document.getElementById("avatar").src = `https://cdn.discordapp.com/avatars/${localStorage.getItem("avatar")}`
document.getElementById("decoration").src = `https://cdn.discordapp.com/avatar-decoration-presets/${localStorage.getItem("decoration")}`

/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

const cookies = document.cookie.split('; ');

  const confirmationCookie = cookies.find(row => row.startsWith('seen_cookie_message='));
  if (!confirmationCookie) $('#cookie-banner').show();

  const hmrcConfirmationCookie = cookies.find(row => row.startsWith('seen_hmrc_cookie_message='));
  if (!hmrcConfirmationCookie) $('#hmrc-cookie-banner').show();

  // Reset cookies policy if at prototype homepage
  if (window.location.pathname === "/") {
    document.cookie = `seen_cookie_message=;expires=${new Date(0).toUTCString()};domain=${location.hostname}`;
    document.cookie = `seen_hmrc_cookie_message=;expires=${new Date(0).toUTCString()};domain=${location.hostname}`;
    $('.govuk-cookie-banner').hide()
  }

  const acceptCookies = cookieName => {
    document.cookie = `${cookieName}=yes;path=/;`;
    $('#cookies-notice').hide();
    $('#cookies-confirmed').show();
    $('.accept').show();
  }
  const declineCookies = () => {
    $('#cookies-notice').hide();
    $('#cookies-confirmed').show();
    $('.reject').show();
  }
  $('#accept-cookies').click(() => acceptCookies('seen_cookie_message'))
  $('#hmrc-accept-cookies').click(() => acceptCookies('seen_hmrc_cookie_message'))
  $('#decline-cookies').click(() => declineCookies())
  $('#hide-cookies-banner').click(() => $('.govuk-cookie-banner').hide());
})

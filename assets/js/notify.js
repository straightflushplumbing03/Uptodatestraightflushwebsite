(function () {
  // Only run on city pages or if a CTA is clicked
  function getCityFromPath() {
    var path = location.pathname || '';
    var match = path.match(/cities\/([^\/]+)/i);
    return match ? match[1].replace('.html','') : null;
  }

  function sendNotify(payload) {
    try {
      if (sessionStorage.getItem('notify_sent_' + payload.page)) return;
      sessionStorage.setItem('notify_sent_' + payload.page, '1');
    } catch (e) {}

    fetch('/.netlify/functions/notify-sms', { // adjust path per host
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(function(err){
      console.error('Notify send failed', err);
    });
  }

  function onCtaClick(e) {
    var city = getCityFromPath() || document.querySelector('meta[name="city"]')?.content || 'unknown';
    var payload = {
      page: city,
      title: document.title,
      url: location.href,
      time: new Date().toISOString()
    };
    sendNotify(payload);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var ctas = document.querySelectorAll('a.btn-primary, a.nav-phone, a[href="/contact.html"], button.schedule-cta');
    ctas.forEach(function (el) {
      el.addEventListener('click', onCtaClick);
    });
  });
})();

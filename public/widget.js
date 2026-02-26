(function() {
  var container = document.getElementById('testimonials-widget');
  if (!container) return;

  var script = document.currentScript;
  var token = script.getAttribute('data-token');
  var baseUrl = script.src.replace('/widget.js', '');

  fetch(baseUrl + '/api/embed/' + token)
    .then(function(res) { return res.json(); })
    .then(function(testimonials) {
      if (!testimonials.length) {
        container.innerHTML = '<p style="color: #666; text-align: center;">No testimonials available</p>';
        return;
      }

      var currentIndex = 0;

      function renderTestimonial(t) {
        var stars = '';
        for (var i = 0; i < 5; i++) {
          stars += i < t.rating ? '\u2605' : '\u2606';
        }

        return '<div class="tw-testimonial" style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">' +
          '<div class="tw-stars" style="color: #fbbf24; font-size: 20px; margin-bottom: 12px;">' + stars + '</div>' +
          '<p class="tw-text" style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">' + t.text + '</p>' +
          '<div class="tw-author" style="font-weight: 600; color: #111827;">' +
            t.clientName +
            (t.company ? ' <span style="font-weight: 400; color: #6b7280;">from ' + t.company + '</span>' : '') +
          '</div>' +
        '</div>';
      }

      function showTestimonial() {
        container.innerHTML = renderTestimonial(testimonials[currentIndex]);
        currentIndex = (currentIndex + 1) % testimonials.length;
      }

      showTestimonial();
      if (testimonials.length > 1) {
        setInterval(showTestimonial, 5000);
      }
    })
    .catch(function(err) {
      console.error('Failed to load testimonials:', err);
    });
})();

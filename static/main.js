
var menuToggle = document.getElementById("menuToggle");
var scrollHeight = 100; // make navbar colored/hidden beyond this
var sm = 768; // small viewport width
var xs = 576; // medium viewport width
var xl = 1400; // xl viewport width

// function to get width of viewport
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
window.getWidth = getWidth;



// toggle navbar class on menu switch
$("#menuSwitch").click(function () {
  $("#main-nav").toggleClass("menu-open");

  if ($(".navbar").hasClass("nav-colored")) {
    $(".navbar").removeClass("nav-colored");
  } else if ($(window).scrollTop() > scrollHeight) {
    $(".navbar").addClass("nav-colored");
  }

  $("#nav-headings li").each(function () {
    $(this).removeClass("active");
    $(this).removeClass("inactive");
  });
  $("#nav-items .tab-pane").each(function () {
    $(this).removeClass("active");
  });

  $(".mobile-nav-items").hide();
});

$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll > scrollHeight) {
    if (!$("#main-nav").hasClass("menu-open")) {
      $(".navbar").addClass("nav-colored");
    }
  } else {
    $(".navbar").removeClass("nav-colored");
  }
});

// close navbar on escape
$(document).keyup(function (e) {
  if (e.keyCode == 27 && $("#main-nav").hasClass("menu-open")) {
    // escape key maps to keycode `27`
    $("#main-nav").removeClass("menu-open");
    $(".navbar").removeClass("desktop-menu");
    $("#nav-headings li").each(function () {
      $(this).removeClass("active");
      $(this).removeClass("inactive");
    });
    $("#nav-items .tab-pane").each(function () {
      $(this).removeClass("active");
    });
    $(".mobile-nav-items").hide();
  }
});

// show nav menu items on hover
$("#nav-headings > ul > li").hover(
  // handler in
  function () {
    if (getWidth() > sm) {
      $("#nav-headings > ul > li").each(function () {
        $(this).removeClass("active");
        $(this).addClass("inactive");
      });

      $(this).removeClass("inactive");
      $(this).addClass("active");

      var id = $(this).find("a").attr("id");

      $("#nav-items .tab-pane").each(function () {
        $(this).removeClass("active");
      });

      var tab_name = id.split("-")[0];
      $("#" + tab_name + "-pane").addClass("active");
    }
  },
  // handler out - nothing
  function () {}
);

// navbar show on click
$("#nav-headings > ul > li").click(function () {
  var id = $(this).find("a").attr("id");
  var tab_name = id.split("-")[0];

  if ($(this).hasClass("active")) {
    $("#nav-headings > ul > li").each(function () {
      $(this).removeClass("active");
      $(this).removeClass("inactive");
    });

    $("#" + tab_name + "-pane").removeClass("active");
  } else {
    $("#nav-headings > ul > li").each(function () {
      $(this).removeClass("active");
      $(this).addClass("inactive");
    });

    $(this).addClass("active");
    $(this).removeClass("inactive");
    $("#" + tab_name + "-pane").addClass("active");
  }

  if (getWidth() < sm) {
    if ($(this).find(".mobile-nav-items").css("display") == "none") {
      $(".mobile-nav-items").slideUp(300);
      $(this).find(".mobile-nav-items").slideDown(300);
    } else {
      $(".mobile-nav-items").slideUp(300);
    }
  }
});

// show/hide footer on mobile
$(".footer-heading").on("click", function () {
  if (getWidth() <= xs) {
    if ($(this).siblings("ul").css("display") === "none") {
      $("#footerNav ul").slideUp();
      $(this).siblings("ul").slideDown();
    } else {
      $("#footerNav ul").slideUp();
    }
  }
});

function getXoffset(wrapperWidth) {
  var size = 50 + Math.random() * 100;

  return (size + Math.random() * (wrapperWidth - 2 * size))
    .toString()
    .concat("px");
}

function getYoffset(height) {
  return (Math.random() * height).toString().concat("px");
}


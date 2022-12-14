function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function getTimeBetween(dateGame, dateActu, lang) {
    const oneMinute = 1000 * 60;
    const oneHours = 1000 * 60 * 60;
    const oneDay = 1000 * 60 * 60 * 24;
    const oneMonth = 1000 * 60 * 60 * 24 * 30;
    const oneYear = 1000 * 60 * 60 * 24 * 365;

    const diffInTime = dateActu.getTime() - dateGame.getTime();
    if (lang == "en") {
        if (diffInTime >= oneYear) {
            return Math.round(diffInTime / oneYear) + " years ago";
        }
        if (diffInTime >= oneMonth) {
            return Math.round(diffInTime / oneMonth) + " months ago";
        }
        if (diffInTime >= oneDay - (oneHours / 2)) {
            if (Math.round(diffInTime / oneDay) > 1) {
                return Math.round(diffInTime / oneDay) + " days ago";
            }
            return Math.round(diffInTime / oneDay) + " day ago";
        }
        if (diffInTime >= oneHours) {
            if (Math.round(diffInTime / oneHours) > 1) {
                return Math.round(diffInTime / oneHours) + " hours ago";
            }
            return Math.round(diffInTime / oneHours) + " hour ago";
        }
        if (Math.round(diffInTime / oneMinute) > 1) {
            return Math.round(diffInTime / oneMinute) + " minutes ago";
        }
        return Math.round(diffInTime / oneMinute) + " minute ago";
    } else if (lang == "fr") {
        if (diffInTime >= oneYear) {
            return "Il y a " + Math.round(diffInTime / oneYear) + " année";
        }
        if (diffInTime >= oneMonth) {
            return "Il y a " + Math.round(diffInTime / oneMonth) + " mois";
        }
        if (diffInTime >= oneDay - (oneHours / 2)) {
            if (Math.round(diffInTime / oneDay) > 1) {
                return "Il y a " + Math.round(diffInTime / oneDay) + " jours";
            }
            return "Il y a " + Math.round(diffInTime / oneDay) + " jour";
        }
        if (diffInTime >= oneHours) {
            if (Math.round(diffInTime / oneHours) > 1) {
                return "Il y a " + Math.round(diffInTime / oneHours) + " heures";
            }
            return "Il y a " + Math.round(diffInTime / oneHours) + " heure";
        }
        if (Math.round(diffInTime / oneMinute) > 1) {
            return "Il y a " + Math.round(diffInTime / oneMinute) + " minutes";
        }
        return "Il y a " + Math.round(diffInTime / oneMinute) + " minute";
    } else {
        if (diffInTime >= oneYear) {
            return Math.round(diffInTime / oneYear) + " years ago";
        }
        if (diffInTime >= oneMonth) {
            return Math.round(diffInTime / oneMonth) + " months ago";
        }
        if (diffInTime >= oneDay - (oneHours / 2)) {
            if (Math.round(diffInTime / oneDay) > 1) {
                return Math.round(diffInTime / oneDay) + " days ago";
            }
            return Math.round(diffInTime / oneDay) + " day ago";
        }
        if (diffInTime >= oneHours) {
            if (Math.round(diffInTime / oneHours) > 1) {
                return Math.round(diffInTime / oneHours) + " hours ago";
            }
            return Math.round(diffInTime / oneHours) + " hour ago";
        }
        if (Math.round(diffInTime / oneMinute) > 1) {
            return Math.round(diffInTime / oneMinute) + " minutes ago";
        }
        return Math.round(diffInTime / oneMinute) + " minute ago";
    }
}

function notIsNaN(val) {
    if (isNaN(val)) {
        return "";
    } else {
        return val;
    }
}

function formateMmrDiff(mmrDiff) {
    let mmrDiffFormated;
    if (isNaN(mmrDiff)) {
        return "";
    } else {
        if (String(mmrDiff).slice(0, 1) == "-") {
            mmrDiffFormated = '<p class="m-0 red"> - ' + String(mmrDiff).slice(1, 6) + "</p>";
        } else {
            mmrDiffFormated = '<p class="m-0 green"> + ' + mmrDiff + "</p>";
        }
        return mmrDiffFormated;
    }
}

function formateCountMmrDiff(mmrDiff) {
    let mmrDiffFormated;
    if (isNaN(mmrDiff)) {
        return "";
    } else {
        mmrDiff = Math.round(mmrDiff * 100) / 100;
        if (String(mmrDiff).slice(0, 1) == "-") {
            mmrDiffFormated = '<p class="m-0 red"> - ' + String(mmrDiff).slice(1, 6) + "MMR</p>";
        } else {
            mmrDiffFormated = '<p class="m-0 green"> + ' + mmrDiff + "MMR</p>";
        }
        return mmrDiffFormated;
    }
}

function isBot(username) {
    if (username == "BOT") {
        return true;
    } else {
        return false;
    }
}

function search(name) {
    if (name.length > 2) {
        fetch("mvsstatsearch?name=" + name)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    $("#search-result").addClass("json-txt-" + data.error);
                    $("#search-box").attr("style", "display:block;");
                } else {
                    $("#search-result").removeClass("json-txt-notExist");
                    $("#search-result").removeClass("json-txt-notSpecificEnough");
                    viewsSearchResult(data);
                    getTextSearchByLang(userLang);
                }
            });
    } else {
        $("#search-box").attr("style", "display:none;");
    }
}

function getTextAccountByLang(lang) {
    fetch("json/account.json")
        .then((res) => res.json())
        .then((data) => {
            if (data[lang]) {
                for (let property in data.en) {
                    $(".json-txt-" + property).text(data[lang][property]);
                }
            } else {
                for (let property in data.en) {
                    $(".json-txt-" + property).text(data.en[property]);
                }
            }
        });
}

function getTextLeaderboardByLang(lang) {
    fetch("json/leaderboard.json")
        .then((res) => res.json())
        .then((data) => {
            if (data[lang]) {
                for (let property in data.en) {
                    $(".json-txt-" + property).text(data[lang][property]);
                }
            } else {
                for (let property in data.en) {
                    $(".json-txt-" + property).text(data.en[property]);
                }
            }
        });
}

function getTextMatchsByLang(lang) {
    fetch("json/matchs.json")
        .then((res) => res.json())
        .then((data) => {
            if (data[lang]) {
                for (let property in data.en) {
                    $(".json-txt-" + property).text(data[lang][property]);
                }
            } else {
                for (let property in data.en) {
                    $(".json-txt-" + property).text(data.en[property]);
                }
            }
        });
}

function getTextMoredataByLang(lang) {
    fetch("json/moredata.json")
        .then((res) => res.json())
        .then((data) => {
            if (data[lang]) {
                for (let property in data.en) {
                    $(".json-txt-" + property).text(data[lang][property]);
                }
            } else {
                for (let property in data.en) {
                    $(".json-txt-" + property).text(data.en[property]);
                }
            }
        });
}

function getTextNavByLang(lang) {
    fetch("json/nav.json")
        .then((res) => res.json())
        .then((data) => {
            if (data[lang]) {
                for (let property in data.en) {
                    $(".json-txt-" + property).text(data[lang][property]);
                }
            } else {
                for (let property in data.en) {
                    $(".json-txt-" + property).text(data.en[property]);
                }
            }
        });
}

function getTextSearchByLang(lang) {
    fetch("json/search.json")
        .then((res) => res.json())
        .then((data) => {
            if (data[lang]) {
                for (let property in data.en) {
                    $(".json-txt-" + property).text(data[lang][property]);
                }
            } else {
                for (let property in data.en) {
                    $(".json-txt-" + property).text(data.en[property]);
                }
            }
        });
}
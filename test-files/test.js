(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == 'function' && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw ((f.code = 'MODULE_NOT_FOUND'), f);
      }
      var l = (n[o] = { exports: {} });
      t[o][0].call(
        l.exports,
        function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[o].exports;
  }
  var i = typeof require == 'function' && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    1: [
      function(require, module, exports) {
        'use strict';

        var rosterObj = {
          celtics: {
            roster: {},
            leaders: {
              pts: [['--', '--', 0, '--'], ['--', '--', 0, '--'], ['--', '--', 0, '--']],
              ast: [['--', '--', 0, '--'], ['--', '--', 0, '--'], ['--', '--', 0, '--']],
              reb: [['--', '--', 0, '--'], ['--', '--', 0, '--'], ['--', '--', 0, '--']]
            }
          },
          away: {
            roster: {},
            leaders: {
              pts: [['--', '--', 0, '--'], ['--', '--', 0, '--'], ['--', '--', 0, '--']],
              ast: [['--', '--', 0, '--'], ['--', '--', 0, '--'], ['--', '--', 0, '--']],
              reb: [['--', '--', 0, '--'], ['--', '--', 0, '--'], ['--', '--', 0, '--']]
            }
          }
        };

        if (window.location.href.indexOf('nba.com') > -1) {
          var dummyVar = '&';
          var feeds = {
            todaysScores: 'http://data.nba.com/data/v2015/json/mobile_teams/nba/2017/scores/00_todays_scores.json',
            celticsRoster: 'http://data.nba.com/data/v2015/json/mobile_teams/nba/2017/teams/celtics_roster.json',
            awayRoster: function awayRoster(awayTn) {
              return 'http://data.nba.com/data/v2015/json/mobile_teams/nba/2017/teams/' + awayTn + '_roster.json';
            },
            bioData: 'http://io.cnn.net/nba/nba/.element/media/2.0/teamsites/celtics/json/bio-data.json',
            playercard: function playercard(pid) {
              return 'http://data.nba.com/data/v2015/json/mobile_teams/nba/2017/players/playercard_' + pid + '_02.json';
            },
            playercardAway: function playercardAway(pid) {
              return 'http://data.nba.com/data/v2015/json/mobile_teams/nba/2017/players/playercard_' + pid + '_02.json';
            },
            gamedetail: function gamedetail(gid) {
              return 'http://data.nba.com/data/v2015/json/mobile_teams/nba/2017/scores/gamedetail/' + gid + '_gamedetail.json';
            },
            standings: 'http://data.nba.com/data/v2015/json/mobile_teams/nba/2017/00_standings.json',
            leagueLeaders:
              'http://stats.nba.com/stats/homepagev2?GameScope=Season&LeagueID=00&PlayerOrTeam=Player&PlayerScope=All+Players&Season=2017-18&SeasonType=Regular+Season&StatType=Traditional&callback=?'
          };
        } else {
          var feeds = {
            todaysScores: 'http://localhost:8888/data/mobile-stats-feed/todays_scores.json',
            celticsRoster: 'http://localhost:8888/data/mobile-stats-feed/celtics_roster.json',
            awayRoster: function awayRoster(awayTn) {
              return 'http://localhost:8888/data/mobile-stats-feed/away_roster.json';
            },
            bioData: 'http://localhost:8888/data/bio-data.json',
            playercard: function playercard(pid) {
              return 'http://localhost:8888/data/mobile-stats-feed/playercards/playercard-' + pid + '.json';
            },
            playercardAway: function playercardAway(pid) {
              return 'http://localhost:8888/data/mobile-stats-feed/playercards/playercard-202330.json';
            },
            gamedetail: function gamedetail(gid) {
              return 'http://localhost:8888/data/mobile-stats-feed/gamedetail.json';
            },
            standings: 'http://localhost:8888/data/mobile-stats-feed/standings.json',
            leagueLeaders: 'http://localhost:8888/data/league_leaders.json'
          };
        }

        var gameStarted = false;
        var playerSpotlightCounter = 1;
        jQuery(document).ready(function() {
          allStar();
          var gid = '';
          var awayTeam = '';
          var awayTn = '';
          var date = new Date();
          var leftWrapCounter = false;
          jQuery.ajax({
            url: feeds.todaysScores,
            async: false,
            success: function success(todaysScoresData) {
              for (var i = 0; i < todaysScoresData.gs.g.length; i++) {
                if (todaysScoresData.gs.g[i].h.ta == 'BOS') {
                  // TRANSITIONS
                  var _cycle = function _cycle() {
                    /*                        mobileApp();*/
                    // DURATION: 25000
                    /*                        setTimeout(allStar, 0);*/
                    /*                        setTimeout(function() {
                                                    leaders(gid);
                                                }, 25000);*/
                    // DURATION: 44100
                    /*                         setTimeout(social, 69000); */
                    //DURATION: 150000
                    /*                         setTimeout(function(){
                                                    playerSpotlight(rosterObj);
                                                },85000)*/
                    //DURATION: 40000
                  };

                  //CHANGE THIS
                  awayTeam = todaysScoresData.gs.g[i].v.ta;
                  awayTn = todaysScoresData.gs.g[i].v.tn.toLowerCase();
                  gid = todaysScoresData.gs.g[i].gid;
                  loadRosterData(awayTeam, awayTn);
                  scoresInit(todaysScoresData);
                  standingsInit(awayTeam);
                  leagueLeaders();
                  leftWrap();
                  _cycle();
                  /*                    setInterval(cycle, 123000);*/
                }
              }
            }
          });
        });

        function cycle() {}
        /*======================================
        =            MISC FUNCTIONS            =
        ======================================*/
        function playerAge(dob) {
          var today = new Date();
          var birthDate = new Date(dob);
          var age = today.getFullYear() - birthDate.getFullYear();
          return age;
        }

        function generateTimeline(selectedPlayer) {
          // APPEND: TIMELINE
          var seasonsPlayed = rosterObj.celtics.roster[selectedPlayer].stats.sa.length;
          var timelineHTML = '';
          var seasonYearHTML = '';
          for (var i = 0; i < seasonsPlayed; i++) {
            var teamAbbreviation = rosterObj.celtics.roster[selectedPlayer].stats.sa[i].ta;
            var traded = rosterObj.celtics.roster[selectedPlayer].stats.sa[i].spl.length;
            var segmentInner = '';
            var title = '';
            var seasonYearText = rosterObj.celtics.roster[selectedPlayer].stats.sa[i].val;
            if (i === 0 || teamAbbreviation !== rosterObj.celtics.roster[selectedPlayer].stats.sa[i - 1].ta) {
              // If this is a new team, start the team wrap.
              title = teamAbbreviation;
            }
            if (traded) {
              for (var x = 0; x < traded; x++) {
                var gpTot = rosterObj.celtics.roster[selectedPlayer].stats.sa[i].gp;
                var gp = rosterObj.celtics.roster[selectedPlayer].stats.sa[i].spl[x].gp;
                var gpPercentage = Math.round(gp / gpTot * 100);
                teamAbbreviation = rosterObj.celtics.roster[selectedPlayer].stats.sa[i].spl[x].ta;
                if (
                  i === 0 ||
                  (teamAbbreviation !== rosterObj.celtics.roster[selectedPlayer].stats.sa[i - 1].ta &&
                    teamAbbreviation !== rosterObj.celtics.roster[selectedPlayer].stats.sa[i + 1].ta)
                ) {
                  // If this is a new team, start the team wrap.
                  title = teamAbbreviation;
                } else {
                  title = '';
                }
                segmentInner +=
                  '<div data-season-year="' +
                  seasonYearText +
                  '" data-team="' +
                  teamAbbreviation +
                  '" style="" class="segment-inner ' +
                  teamAbbreviation +
                  '-bg"><p>' +
                  title +
                  '</p></div>';
              }
            } else {
              segmentInner =
                '<div data-season-year="' +
                seasonYearText +
                '" data-team="' +
                teamAbbreviation +
                '" class="segment-inner ' +
                teamAbbreviation +
                '-bg"><p>' +
                title +
                '</p></div>';
            }
            timelineHTML += '<div class="segment">' + segmentInner + '</div>';
            seasonYearHTML += '<div class="segment"><p>' + seasonYearText + '</p></div>';
          }
          jQuery('.timeline-wrap').html('<div class="timeline appended">' + timelineHTML + '</div><div class="season-year appended">' + seasonYearHTML + '</div>');
        }

        function createIndex(keys, array) {
          var newArr = keys.map(function(item) {
            return array.indexOf(item);
          });
          return newArr;
        }

        function round(number) {
          if (typeof number !== 'number' || number == undefined) {
            return number;
          } else {
            return number.toFixed(1);
          }
        }
        /*==================================
        =            INITIALIZE            =
        ==================================*/
        function checkGameStatus() {
          if (!gameStarted) {
            jQuery.ajax({
              url: feeds.todaysScores,
              async: false,
              success: function success(datadata) {
                var gid = '';
                for (var i = 0; i < 5; i++) {
                  if (datadata.gs.g[i].h.ta == 'BOS' && datadata.gs.g[i].st == 2) {
                    gameStarted = true;
                    console.log('gamestarted');
                  }
                }
              }
            });
          }
          return gameStarted;
        }
        /*============================================================
        =            LOAD ROSTER INFO (build rosterObj)              =
        ============================================================*/
        function loadRosterData(awayTeam, awayTn) {
          var roster = '';
          jQuery.ajax({
            url: feeds.celticsRoster,
            async: false,
            success: function success(data) {
              roster = data;
              for (var property in roster.t) {
                if (property !== 'pl') {
                  rosterObj.celtics[property] = roster.t[property];
                }
              }
            },
            error: function error() {}
          });
          var awayRoster = '';
          jQuery.ajax({
            url: feeds.awayRoster(awayTn),
            async: false,
            success: function success(data) {
              awayRoster = data;
              for (var property in awayRoster.t) {
                if (property !== 'pl') {
                  rosterObj.away[property] = awayRoster.t[property];
                }
              }
            },
            error: function error() {}
          });
          var bioData = '';
          jQuery.ajax({
            url: feeds.bioData,
            async: false,
            success: function success(data) {
              bioData = data;
            },
            error: function error() {}
          });
          for (var i = 0; i < roster.t.pl.length; i++) {
            var pid = roster.t.pl[i].pid;
            rosterObj.celtics.roster[pid] = roster.t.pl[i];
            for (var property in bioData[pid]) {
              rosterObj.celtics.roster[pid].bio = bioData[pid];
            }
            jQuery.ajax({
              url: feeds.playercard(pid),
              async: false,
              success: function success(data) {
                if (data.pl.ca.hasOwnProperty('sa')) {
                  rosterObj.celtics.roster[pid].stats = data.pl.ca.sa[data.pl.ca.sa.length - 1];
                  rosterObj.celtics.roster[pid].stats.sa = data.pl.ca.sa;
                } else {
                  rosterObj.celtics.roster[pid].stats = data.pl.ca;
                }
                rosterObj.celtics.roster[pid].stats.pts = round(rosterObj.celtics.roster[pid].stats.pts);
                rosterObj.celtics.roster[pid].stats.ast = round(rosterObj.celtics.roster[pid].stats.ast);
                rosterObj.celtics.roster[pid].stats.reb = round(rosterObj.celtics.roster[pid].stats.reb);
              },
              error: function error() {}
            });
          }
          for (var i = 0; i < awayRoster.t.pl.length; i++) {
            var pid = awayRoster.t.pl[i].pid;
            rosterObj.away.roster[pid] = awayRoster.t.pl[i];
            jQuery.ajax({
              url: feeds.playercardAway(pid), // CHANGE PID
              async: false,
              success: function success(data) {
                if (data.pl.ca.hasOwnProperty('sa')) {
                  rosterObj.away.roster[pid].stats = data.pl.ca.sa[data.pl.ca.sa.length - 1];
                  rosterObj.away.roster[pid].stats.sa = data.pl.ca.sa;
                } else {
                  rosterObj.away.roster[pid].stats = data.pl.ca;
                }
                rosterObj.away.roster[pid].stats.pts = round(rosterObj.away.roster[pid].stats.pts);
                rosterObj.away.roster[pid].stats.ast = round(rosterObj.away.roster[pid].stats.ast);
                rosterObj.away.roster[pid].stats.reb = round(rosterObj.away.roster[pid].stats.reb);
              },
              error: function error() {}
            });
          }
          for (var team in rosterObj) {
            for (var player in rosterObj[team].roster) {
              for (var stat in rosterObj[team].leaders) {
                rosterObj[team].leaders[stat].push([
                  rosterObj[team].roster[player].fn.toUpperCase(),
                  rosterObj[team].roster[player].ln.toUpperCase(),
                  rosterObj[team].roster[player].stats[stat],
                  rosterObj[team].roster[player].pid
                ]);
              }
            }
          }
          for (var team in rosterObj) {
            for (var stat in rosterObj[team].leaders) {
              rosterObj[team].leaders[stat].sort(function(a, b) {
                return b[2] - a[2];
              });
            }
          }
          console.log('SORTED:');
          console.log(rosterObj);
        }

        function statsNotAvailable(pid) {
          rosterObj[pid].stats = {};
          rosterObj[pid].stats.sa = [{}];
          rosterObj[pid].stats.hasStats = false;
          var caIndex = ['gp', 'gs', 'min', 'fgp', 'tpp', 'ftp', 'oreb', 'dreb', 'reb', 'ast', 'stl', 'blk', 'tov', 'pf', 'pts', 'nostats'];
          var saIndex = ['tid', 'val', 'gp', 'gs', 'min', 'fgp', 'tpp', 'ftp', 'oreb', 'dreb', 'reb', 'ast', 'stl', 'blk', 'tov', 'pf', 'pts', 'spl', 'ta', 'tn', 'tc'];
          for (var i = 0; i < saIndex.length; i++) {
            rosterObj[pid].stats.sa[0][saIndex[i]] = 'N/A';
            if (i === 1) {
              rosterObj[pid].stats.sa[0][saIndex[i]] = playerCardYear.toString().substr(2, 2) + '-' + (playerCardYear + 1).toString().substr(2, 2);
            }
            if (i === 17) {
              rosterObj[pid].stats.sa[0][saIndex[i]] = [];
            }
            if (i === 18) {
              rosterObj[pid].stats.sa[0][saIndex[i]] = 'BOS';
            }
          }
          for (var i = 0; i < caIndex.length; i++) {
            rosterObj[pid].stats[caIndex[i]] = 'N/A';
            if (i === 15) {
              rosterObj[pid].stats[caIndex[i]] = true;
            }
          }
        }

        function loadGameDetail(gid) {}

        function loadAwayTeamData() {}
        /*==================================
        =            RIGHT WRAP            =
        ==================================*/
        function playerSpotlight(rosterObj) {
          /* 1 - WHITE LINE HORIZTONAL */
          setTimeout(function() {
            jQuery('.white-line.horizontal').addClass('transition-1');
          }, 500);
          setTimeout(function() {
            jQuery('.social-top .white-line.vertical:nth-child(odd)').addClass('transition-1');
            jQuery('.social-bottom .white-line.vertical:nth-child(even)').addClass('transition-1');
          }, 800);
          /* 2b - WHITE LINE VERTICAL */
          setTimeout(function() {
            jQuery('.social-top .white-line.vertical:nth-child(even)').addClass('transition-1');
            jQuery('.social-bottom .white-line.vertical:nth-child(odd)').addClass('transition-1');
          }, 1000);
          /* 3 - GENERATE AND REVEAL PLAYER BOXES */
          setTimeout(function() {
            jQuery('.social-top, .social-bottom').addClass('transition-1');
            jQuery('.player-box-wrap').addClass('transition-1');
          }, 1200);
          /* 4 - APPEND HEADSHOTS */
          setTimeout(function() {
            jQuery('.player-box-wrap').addClass('transition-2');
            jQuery('.player-box').addClass('transition-1');
            var delay = 0;
            var forinCounter = 0;
            for (var player in rosterObj.celtics.roster) {
              var headshot = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/' + rosterObj.celtics.roster[player].pid + '.png';
              jQuery('.player-box:nth-child(' + (forinCounter + 1) + ')').append('<img class="appended headshot" src="' + headshot + '"/>');
              jQuery('.player-box:nth-child(' + (forinCounter + 1) + ')').attr('data-pid', rosterObj.celtics.roster[player].pid);
              jQuery('.player-box img').on('error', function() {
                jQuery(this).attr('src', 'https://i.cdn.turner.com/nba/nba/.element/media/2.0/teamsites/celtics/media/generic-player-light_600x438.png');
              });
              jQuery('.player-box:nth-child(' + (forinCounter + 1) + ') img')
                .delay(delay)
                .fadeTo(300, 1);
              delay += 30;
              forinCounter++;
            }
          }, 1700);
          /* 5 - PLAYER SELECT */
          var selectedPlayer = '';
          setTimeout(function() {
            jQuery('.player-box').addClass('transition-2');
            jQuery('.player-box:nth-child(' + playerSpotlightCounter + ')').addClass('selected');
            selectedPlayer = jQuery('.player-box:nth-child(' + playerSpotlightCounter + ')').attr('data-pid');
            setTimeout(function() {
              jQuery('.player-box')
                .not('.replacement.selected')
                .addClass('transition-4');
            }, 800);
          }, 3000);
          /* 6 - PLAYER BOX EXPAND */
          setTimeout(function() {
            jQuery('.block-wrap.social').addClass('transition-3');
            jQuery('.player-box.replacement.selected').addClass('transition-3');
          }, 4000);
          /* 7 - SPOTLIGHT HTML */
          setTimeout(function() {
            generateTimeline(selectedPlayer);
            jQuery('.player-box.replacement.selected')
              .clone()
              .appendTo('.block-wrap.player-spotlight .top-wrap');
            jQuery('.player-spotlight .selected').addClass('.appended');
            jQuery('.block-wrap.player-spotlight').addClass('transition-1');
            jQuery('.block-wrap.social').addClass('transition-1');
            var stats = rosterObj.celtics.roster[selectedPlayer].stats;
            jQuery('.player-spotlight .top-wrap .player-top').append(
              '<img class="silo appended" src="http://io.cnn.net/nba/nba/.element/media/2.0/teamsites/celtics/media/silo-466x591-' +
                rosterObj.celtics.roster[selectedPlayer].pid +
                '.png" /><div class="top appended"><div class="player-name-wrap"><p class="player-name"><span>' +
                rosterObj.celtics.roster[selectedPlayer].fn.toUpperCase() +
                '</span> <br> ' +
                rosterObj.celtics.roster[selectedPlayer].ln.toUpperCase() +
                '</p></div><p class="player-number">' +
                rosterObj.celtics.roster[selectedPlayer].num +
                '</br><span>' +
                rosterObj.celtics.roster[selectedPlayer].pos +
                '</span></p></div><div class="middle appended"><ul class="info clearfix"><li><p>AGE<span class="sm-hide">:&nbsp;</span> </br><span class="info-value">' +
                playerAge(rosterObj.celtics.roster[selectedPlayer].dob) +
                '</span></p></li><li><p>HT<span class="sm-hide">:&nbsp;</span> </br><span class="info-value">' +
                rosterObj.celtics.roster[selectedPlayer].ht +
                '</span></p></li><li><p>WT<span class="sm-hide">:&nbsp;</span> </br><span class="info-value">' +
                rosterObj.celtics.roster[selectedPlayer].wt +
                '</span></p></li></ul></div><div class="bottom full clearfix sm-hide appended"><table class="averages"><tr class="averages-labels"><td><p>GP</p></td><td><p>PPG</p></td><td><p>RPG</p></td><td><p>APG</p></td></tr><tr class="averages-season"><td class="gp"><p></p></td><td class="pts"><p></p></td><td class="reb"><p></p></td><td class="ast"><p></p></td></tr></table></div>'
            );
            jQuery('.player-spotlight .averages-season').html(
              '<td class="appended"><p>' +
                stats.sa[0].gp +
                '</p></td><td class="appended"><p>' +
                stats.sa[0].pts +
                '</p></td><td class="appended"><p>' +
                stats.sa[0].reb +
                '</p></td><td class="appended"><p>' +
                stats.sa[0].ast +
                '</p></td>'
            );
            jQuery('.player-spotlight .player-name').fadeTo(200, 1);
            var playerFacts = rosterObj.celtics.roster[selectedPlayer].bio.personal;
            for (var i = 0; i < 3; i++) {
              if (i <= rosterObj.celtics.roster[selectedPlayer].bio.personal.length) {
                jQuery('.player-spotlight .bottom-wrap').append('<div class="dyk-box appended"><p>' + playerFacts[i] + '</p></div>');
              }
            }
            jQuery('.player-spotlight .bottom-wrap').addClass('transition-1');
            if (jQuery('.player-spotlight .bottom-wrap .dyk-box').length > 1) {
              setTimeout(function() {
                jQuery('.player-spotlight .bottom-wrap .dyk-box:nth-of-type(2)').addClass('transition-2');
                jQuery('.player-spotlight .bottom-wrap .dyk-box:nth-of-type(3)').addClass('transition-1');
              }, 10000);
            }
            if (jQuery('.player-spotlight .bottom-wrap .dyk-box').length > 2) {
              setTimeout(function() {
                jQuery('.player-spotlight .bottom-wrap .dyk-box:nth-of-type(3)').addClass('transition-2');
                jQuery('.player-spotlight .bottom-wrap .dyk-box:nth-of-type(4)').addClass('transition-1');
              }, 20000);
            }
          }, 5000);
          /* 8 - SPOTLIGHT SLIDE IN */
          setTimeout(function() {
            jQuery(
              '.player-spotlight .player-top .player-name, .player-spotlight .player-name-wrap, .player-spotlight .headshot, .player-spotlight .info, .player-spotlight .silo, .player-spotlight .averages, .player-spotlight .player-number'
            ).addClass('transition-1');
            setTimeout(function() {
              jQuery('.block-wrap.player-spotlight .player-box').remove();
            }, 15000);
            if (playerSpotlightCounter < 16) {
              playerSpotlightCounter++;
            } else {
              playerSpotlightCounter = 0;
            }
          }, 6000);
          /* 9 - SPOTLIGHT SLIDE OUT */
          setTimeout(function() {
            jQuery('.player-spotlight .bottom-wrap, .player-spotlight .top-wrap').addClass('transition-2');
          }, 40000);
          /* 10 - DONE. REMOVE */
          setTimeout(function() {
            jQuery(' .player-spotlight .appended').remove();
            jQuery(' .player-spotlight .selected').removeClass('selected');
            for (var i = 1; i < 10; i++) {
              jQuery('.right-wrap .transition-' + i).removeClass('transition-' + i);
            }
          }, 45000);
        }

        function leaders(gid, gameStarted) {
          jQuery('.leaders').addClass('active');
          var gameDetail = '';
          var detailAvailable = false;
          var leadersTitle = 'SEASON LEADERS';
          if (checkGameStatus()) {
            leadersTitle = 'GAME LEADERS';
            jQuery.ajax({
              url: feeds.gamedetail(gid),
              async: false,
              success: function success(data) {
                var teamLineScore = ['hls', 'vls'];
                for (var x = 0; x < teamLineScore.length; x++) {
                  var stats = data.g[teamLineScore[x]];
                  var team = '';
                  if (stats.ta === 'BOS') {
                    team = 'celtics';
                  } else {
                    team = 'away';
                  }
                  for (var stat in rosterObj[team].leaders) {
                    rosterObj[team].leaders[stat] = [['--', '--', 0, '--'], ['--', '--', 0, '--'], ['--', '--', 0, '--']];
                  }
                  for (var p = 0; p < stats.pstsg.length; p++) {
                    for (var stat in rosterObj[team].leaders) {
                      rosterObj[team].leaders[stat].push([stats.pstsg[p].fn.toUpperCase(), stats.pstsg[p].ln.toUpperCase(), stats.pstsg[p][stat], stats.pstsg[p].pid]);
                    }
                    rosterObj[team].leaders[stat].sort(function(a, b) {
                      return a[2] - b[2];
                    });
                  }
                  for (var team in rosterObj) {
                    for (var stat in rosterObj[team].leaders) {
                      rosterObj[team].leaders[stat].sort(function(a, b) {
                        return b[2] - a[2];
                      });
                    }
                  }
                  console.log('SORTED:');
                  console.log(rosterObj);
                }
              }
            });
          }
          jQuery('.leaders-title').html(leadersTitle);
          for (var team in rosterObj) {
            for (var i = 0; i < 3; i++) {
              for (var stat in rosterObj[team].leaders) {
                // LEADER STAT VALUE
                jQuery('.leader-section:nth-of-type(' + (i + 2) + ') .' + stat + '.' + team + ' .stat').html(
                  '<span class="appended ' + rosterObj[team].ta + '">' + rosterObj[team].leaders[stat][i][2] + '</span> ' + stat.toUpperCase()
                );
                // LEADER NAME
                if (rosterObj[team].leaders[stat][i][0].length + rosterObj[team].leaders[stat][i][1].length >= 14) {
                  rosterObj[team].leaders[stat][i][0] = rosterObj[team].leaders[stat][i][0].substr(0, 1) + '.';
                }
                jQuery('.leader-section:nth-of-type(' + (i + 2) + ') .' + stat + '.' + team + ' .name').html(
                  '<span class="appended">' + rosterObj[team].leaders[stat][i][0] + '</span> ' + rosterObj[team].leaders[stat][i][1]
                );
                // LEADER HEADSHOT
                jQuery('.leader-section:nth-of-type(' + (i + 2) + ') .' + stat + '.' + team + ' .headshot').attr(
                  'src',
                  'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/' + rosterObj[team].leaders[stat][i][3] + '.png'
                );
              }
            }
          }
          setTimeout(function() {
            jQuery('.leaders, .leaders .block-inner').addClass('transition-1');
          }, 100);
          setTimeout(function() {
            jQuery('.leaders .leader-section').addClass('transition-1');
            jQuery('.leader-subsection.bottom p:nth-of-type(1)').addClass('transition-1');
            jQuery('.leaders .leader-section .underline, .leaders .leader-subsection.top').addClass(rosterObj.celtics.ta + '-bg');
          }, 1100);
          setTimeout(function() {
            jQuery('.leaders .leader-section').addClass('transition-2');
            jQuery('.leaders .block-inner').addClass('transition-2');
          }, 2100);
          var transitionCounter = 1;
          setTimeout(function() {
            var _loop = function _loop(_i) {
              setTimeout(function(numberString) {
                jQuery('.leaders .leader-section .leader-stat-wrap').addClass('transition-' + _i);
                jQuery('.leaders .leader-section .underline, .leaders .leader-subsection.top').removeClass(rosterObj.celtics.ta + '-bg');
                jQuery('.leaders .leader-section .underline, .leaders .leader-subsection.top').addClass(rosterObj.away.ta + '-bg');
                if (transitionCounter % 2 == 0) {
                  setTimeout(function() {
                    jQuery('.leaders .leader-section .underline, .leaders .leader-subsection.top').removeClass(rosterObj.away.ta + '-bg');
                    jQuery('.leaders .leader-section .underline, .leaders .leader-subsection.top').addClass(rosterObj.celtics.ta + '-bg');
                    jQuery('.leader-subsection.bottom p').removeClass('transition-1');
                    jQuery('.leaders .leader-section .underline').addClass('transition-' + _i / 2);
                    jQuery('.leader-subsection.bottom p:nth-of-type(' + (_i - _i / 2 + 1) + ')').addClass('transition-1'); // lol
                  }, 200);
                }
                transitionCounter++;
              }, 7000 * _i);
            };

            for (var _i = 1; _i < 6; _i++) {
              _loop(_i);
            }
          }, 2100);
          setTimeout(function() {
            jQuery('.leaders .leader-section, .leaders .leader-subsection').addClass('transition-3');
          }, 44100);
          setTimeout(function() {
            jQuery('.leaders').addClass('transition-2');
          }, 44100);
          setTimeout(function() {
            jQuery('.leaders .leader-section .underline, .leaders .leader-subsection.top').removeClass(rosterObj.away.ta + '-bg');
            jQuery('.leaders .leader-section .underline, .leaders .leader-subsection.top').addClass(rosterObj.celtics.ta + '-bg');
            jQuery('.leaders').removeClass('active');
            jQuery('.leaders .appended').remove();
            for (var i = 1; i < 10; i++) {
              jQuery('.leaders .transition-' + i + ', .leaders.transition-' + i).removeClass('transition-' + i);
            }
          }, 45000);
        }

        function social() {
          jQuery('.social .text-wrap, .social .underline').removeClass('transition-1');
          jQuery('.social').addClass('active');
          setTimeout(function() {
            jQuery('.social .text-wrap, .social .underline').addClass('transition-1');
          }, 15000);
          setTimeout(function() {
            jQuery('.social .appended').remove();
            jQuery('.social .selected').removeClass('selected');
            jQuery('.social').removeClass('active');
          }, 20000);
        }
        /*function mobileAppInit() {
            var counter = 1;
            setInterval(function() {
                jQuery('.app .bottom-wrap img').removeClass('active');
                jQuery('.app .feature-list p').removeClass('active');
                jQuery('.app .feature-list p:nth-of-type(' + counter + ')').addClass('active');
                jQuery('.app .bottom-wrap img:nth-of-type(' + counter + ')').addClass('active');
                if (counter == 5) {
                    counter = 1;
                } else {
                    counter++;
                }
            }, 2000);
        };
        */
        function mobileApp() {
          jQuery('.app .block-inner').removeClass('transition-1');
          jQuery('.app').addClass('active');
          var counter = 1;
          var rotateScreens = setInterval(function() {
            jQuery('.app .bottom-wrap img').removeClass('active');
            jQuery('.app .feature-list p').removeClass('active');
            jQuery('.app .feature-list p:nth-of-type(' + counter + ')').addClass('active');
            jQuery('.app .bottom-wrap img:nth-of-type(' + counter + ')').addClass('active');
            if (counter == 5) {
              counter = 1;
            } else {
              counter++;
            }
          }, 4000);
          rotateScreens;
          setTimeout(function() {
            jQuery('.app .block-inner').addClass('transition-1');
          }, 24000);
          setTimeout(function() {
            jQuery('.app').removeClass('active');
            clearInterval(rotateScreens);
          }, 25000);
        }

        function allStar() {
          jQuery('.all-star .block-inner').removeClass('transition-1');
          jQuery('.all-star').addClass('active');
          /*    setTimeout(function() {
                    jQuery('.all-star .block-inner').addClass('transition-1');
                }, 24000);
                setTimeout(function() {
                    jQuery('.all-star').removeClass('active');
                    clearInterval(rotateScreens);
                }, 25000);*/
        }
        /*=================================
        =            LEFT WRAP            =
        =================================*/
        function leftWrap() {
          setInterval(function() {
            if (jQuery('.left-wrap .standings').hasClass('transition-1')) {
              jQuery('.left-wrap .standings').removeClass('transition-1');
            } else {
              jQuery('.left-wrap .standings').addClass('transition-1');
            }
            if (jQuery('.left-wrap .scores-and-leaders').hasClass('transition-1')) {
              jQuery('.left-wrap .scores-and-leaders').removeClass('transition-1');
              updateLeagueScores();
            } else {
              jQuery('.left-wrap .scores-and-leaders').addClass('transition-1');
            }
          }, 50000);
        }

        function standingsInit(awayTeam) {
          jQuery.ajax({
            url: feeds.standings,
            async: false,
            success: function success(standingsData) {
              for (var i = 0; i < standingsData.sta.co.length; i++) {
                for (var x = 0; x < standingsData.sta.co[i].di.length; x++) {
                  for (var t = 0; t < standingsData.sta.co[i].di[x].t.length; t++) {
                    var conferences = ['.east', '.west'];
                    var place = standingsData.sta.co[i].di[x].t[t].see;
                    var seed = '';
                    var activeStatus = '';
                    if (standingsData.sta.co[i].di[x].t[t].see <= 8) {
                      seed = standingsData.sta.co[i].di[x].t[t].see;
                    }
                    if (standingsData.sta.co[i].di[x].t[t].ta == 'BOS') {
                      activeStatus = 'active';
                    }
                    if (standingsData.sta.co[i].di[x].t[t].ta == awayTeam) {
                      activeStatus = 'active-away';
                    }
                    var rowHTML =
                      '<div class="place">' +
                      seed +
                      '</div><div class="logo-wrap"><img class="logo" src=http://i.cdn.turner.com/nba/nba/assets/logos/teams/primary/web/' +
                      standingsData.sta.co[i].di[x].t[t].ta +
                      '.svg></div><div class="team + ' +
                      standingsData.sta.co[i].di[x].t[t].ta +
                      '">' +
                      standingsData.sta.co[i].di[x].t[t].ta +
                      '</div><div class="wins">' +
                      standingsData.sta.co[i].di[x].t[t].w +
                      '</div><div class="losses">' +
                      standingsData.sta.co[i].di[x].t[t].l +
                      '</div><div class="games-behind">' +
                      standingsData.sta.co[i].di[x].t[t].gb +
                      '</div>';
                    jQuery(conferences[i] + ' > div:nth-child(' + (place + 1) + ')').html(rowHTML);
                    jQuery(conferences[i] + ' > div:nth-child(' + (place + 1) + ')').addClass(activeStatus);
                  }
                }
              }
            }
          });
        }

        function scoresInit(todaysScoresData) {
          var liveScores = todaysScoresData.gs.g;
          if (liveScores.length != 0) {
            var seasonType = '';
            if (liveScores[0].gid.substr(0, 3) == '001') {
              seasonType = 'pre';
            } else if (liveScores[0].gid.substr(0, 3) == '004') {
              seasonType = 'post';
            }
            if (liveScores.length > 1 || (liveScores.length == 1 && liveScores[0].h.ta != 'BOS')) {
              var statusCodes = [
                '1st Qtr',
                '2nd Qtr',
                '3rd Qtr',
                '4th Qtr',
                '1st OT',
                '2nd OT',
                '3rd OT',
                '4th OT',
                '5th OT',
                '6th OT',
                '7th OT',
                '8th OT',
                '9th OT',
                '10th OT'
              ];
              var scoresHTML = '';
              var added = 0;
              for (var i = liveScores.length - 1; i >= 0; i--) {
                if (liveScores[i].h.ta !== 'BOS' && i < 11) {
                  added++;
                  var vScore = '';
                  var hScore = '';
                  var vResult = '';
                  var hResult = '';
                  var isLive = '';
                  if (liveScores[i].st != 1) {
                    vScore = liveScores[i].v.s;
                    hScore = liveScores[i].h.s;
                    isLive = 'live';
                  }
                  var sText = liveScores[i].stt;
                  if (statusCodes.indexOf(liveScores[i].stt) !== -1) {
                    sText = liveScores[i].stt + ' - ' + liveScores[i].cl;
                  }
                  if (liveScores[i].st == 3 && vScore < hScore) {
                    vResult = 'loser';
                  } else if (liveScores[i].st == 3 && hScore < vScore) {
                    hResult = 'loser';
                  }
                  scoresHTML +=
                    '<div class="score-wrap"><div class="score-status ' +
                    isLive +
                    '">' +
                    sText.toUpperCase() +
                    '</div><div class="' +
                    liveScores[i].v.ta +
                    '"><img src="http://stats.nba.com/media/img/teams/logos/' +
                    liveScores[i].v.ta.toUpperCase() +
                    '_logo.svg"> ' +
                    liveScores[i].v.tc.toUpperCase() +
                    ' ' +
                    liveScores[i].v.tn.toUpperCase() +
                    ' <div class="score-num ' +
                    vResult +
                    '">' +
                    vScore +
                    '</div></div><div class="' +
                    liveScores[i].h.ta +
                    '"><img src="http://stats.nba.com/media/img/teams/logos/' +
                    liveScores[i].h.ta.toUpperCase() +
                    '_logo.svg"> ' +
                    liveScores[i].h.tc.toUpperCase() +
                    ' ' +
                    liveScores[i].h.tn.toUpperCase() +
                    ' <div class="score-num ' +
                    hResult +
                    '">' +
                    hScore +
                    '</div></div></div>';
                }
              }
              jQuery('.scores')
                .empty()
                .append(scoresHTML);
            }
            if (added < 6) {
              jQuery('.league-leaders').show();
            } else {
              jQuery('.league-leaders').hide();
            }
          }
        }

        function updateLeagueScores() {
          jQuery.ajax({
            url: feeds.todaysScores,
            async: false,
            success: function success(data) {
              scoresInit(data);
            }
          });
        }

        function leagueLeaders() {
          var leagueLeadersHTML = '<div class="title"><p>LEAGUE LEADERS</p><p>PTS</p><p>REB</p><p>AST</p><p>STL</p><p>BLK</p></div>';
          var statType = '';
          var dataIndex = ['RANK', 'PLAYER_ID', 'PLAYER', 'TEAM_ID', 'TEAM_ABBREVIATION'];
          jQuery.ajax({
            url: feeds.leagueLeaders,
            dataType: 'jsonp',
            async: false,
            success: function success(data) {
              var leadersData = data.resultSets;
              for (var i = 0; i < leadersData.length; i++) {
                var index = createIndex(dataIndex, leadersData[i].headers);
                var rows = '';
                if (['PTS', 'REB', 'AST', 'STL', 'BLK'].indexOf(leadersData[i].headers[8]) !== -1) {
                  for (var x = 0; x < leadersData[i].rowSet.length; x++) {
                    var n = leadersData[i].rowSet[x][2].split(' ');
                    var fn = n[0].toUpperCase();
                    var ln = n[1].toUpperCase();
                    rows +=
                      '<div class="row"><div class="left"><div class="place">' +
                      leadersData[i].rowSet[x][0] +
                      '</div><div class="logo-wrap"><img class="logo" src="http://stats.nba.com/media/img/teams/logos/' +
                      leadersData[i].rowSet[x][4] +
                      '_logo.svg"/></div><div class="name"><span>' +
                      fn +
                      '</span> ' +
                      ln +
                      '</div></div><div class="right"><div class="value">' +
                      round(leadersData[i].rowSet[x][8]) +
                      '</div></div></div>';
                  }
                  leagueLeadersHTML += '<div class="league-leaders-wrap">' + rows + '</div>';
                }
              }
              jQuery('.league-leaders')
                .empty()
                .append(leagueLeadersHTML);
            }
          });
          var counter = 2;
          setInterval(function() {
            jQuery('.league-leaders-wrap, .league-leaders .title p').removeClass('active');
            jQuery('.league-leaders-wrap:nth-of-type(' + counter + '), .league-leaders .title p:nth-of-type(' + counter + ')').addClass('active');
            if (counter == 6) {
              counter = 2;
            } else {
              counter++;
            }
          }, 10000);
        }
      },
      {}
    ]
  },
  {},
  [1]
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29uY291cnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLFlBQVk7QUFDWixhQUFTO0FBQ0wsZ0JBQVEsRUFESDtBQUVMLGlCQUFTO0FBQ0wsaUJBQUssQ0FDRCxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsQ0FBYixFQUFnQixJQUFoQixDQURDLEVBRUQsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLENBQWIsRUFBZ0IsSUFBaEIsQ0FGQyxFQUdELENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxDQUFiLEVBQWdCLElBQWhCLENBSEMsQ0FEQTtBQU1MLGlCQUFLLENBQ0QsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLENBQWIsRUFBZ0IsSUFBaEIsQ0FEQyxFQUVELENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxDQUFiLEVBQWdCLElBQWhCLENBRkMsRUFHRCxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsQ0FBYixFQUFnQixJQUFoQixDQUhDLENBTkE7QUFXTCxpQkFBSyxDQUNELENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxDQUFiLEVBQWdCLElBQWhCLENBREMsRUFFRCxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsQ0FBYixFQUFnQixJQUFoQixDQUZDLEVBR0QsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLENBQWIsRUFBZ0IsSUFBaEIsQ0FIQztBQVhBO0FBRkosS0FERztBQXFCWixVQUFNO0FBQ0YsZ0JBQVEsRUFETjtBQUVGLGlCQUFTO0FBQ0wsaUJBQUssQ0FDRCxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsQ0FBYixFQUFnQixJQUFoQixDQURDLEVBRUQsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLENBQWIsRUFBZ0IsSUFBaEIsQ0FGQyxFQUdELENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxDQUFiLEVBQWdCLElBQWhCLENBSEMs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QUksVUFBVSxDQUFkO0FBQ0EsZ0JBQVksWUFBVztBQUNuQixlQUFPLGdEQUFQLEVBQXlELFdBQXpELENBQXFFLFFBQXJFO0FBQ0EsZUFBTyxzQ0FBc0MsT0FBdEMsR0FBZ0QsMENBQWhELEdBQTZGLE9BQTdGLEdBQXVHLEdBQTlHLEVBQW1ILFFBQW5ILENBQTRILFFBQTVIO0FBQ0EsWUFBSSxXQUFXLENBQWYsRUFBa0I7QUFDZCxzQkFBVSxDQUFWO0FBQ0gsU0FGRCxNQUVPO0FBQ0g7QUFDSDtBQUNKLEtBUkQsRUFRRyxLQVJIO0FBU0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHJvc3Rlck9iaiA9IHtcbiAgICBjZWx0aWNzOiB7XG4gICAgICAgIHJvc3Rlcjoge30sXG4gICAgICAgIGxlYWRlcnM6IHtcbiAgICAgICAgICAgIHB0czogW1xuICAgICAgICAgICAgICAgIFsnLS0nLCAnLS0nLCAwLCAnLS0nXSxcbiAgICAgICAgICAgICAgICBbJy0tJywgJy0tJywgMCwgJy0tJ10sXG4gICAgICAgICAgICAgICAgWyctLScsICctLScsIDAsICctLSddXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYXN0OiBbXG4gICAgICAgICAgICAgICAgWyctLScsICctLScsIDAsICctLSddLFxuICAgICAgICAgICAgICAgIFsnLS0nLCAnLS0nLCAwLCAnLS0nXSxcbiAgICAgICAgICAgICAgICBbJy0tJywgJy0tJywgMCwgJy0tJ11cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWI6IFtcbiAgICAgICAgICAgICAgICBbJy0tJywgJy0tJywgMCwgJy0tJ10sXG4gICAgICAgICAgICAgICAgWyctLScsICctLScsIDAsICctLSddLFxuICAgICAgICAgICAgICAgIFsnLS0nLCAnLS0nLCAwLCAnLS0nXVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBhd2F5OiB7XG4gICAgICAgIHJvc3Rlcjoge30sXG4gICAgICAgIGxlYWRlcnM6IHtcbiAgICAgICAgICAgIHB0czogW1xuICAgICAgICAgICAgICAgIFsnLS0nLCAnLS0nLCAwLCAnLS0nXSxcbiAgICAgICAgICAgICAgICBbJy0tJywgJy0tJywgMCwgJy0tJ10sXG4gICAgICAgICAgICAgICAgWyctLScsICctLScsIDAsICctLSddXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYXN0OiBbXG4gICAgICAgICAgICAgICAgWyctLScsICctLScsIDAsICctLSddLFxuICAgICAgICAgICAgICAgIFsnLS0nLCAnLS0nLCAwLCAnLS0nXSxcbiAgICAgICAgICAgICAgICBbJy0tJywgJy0tJywgMCwgJy0tJ11cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWI6IFtcbiAgICAgICAgICAgICAgICBbJy0tJywgJy0tJywgMCwgJy0tJ10sXG4gICAgICAgICAgICAgICAgWyctLScsICctLScsIDAsICctLSddLFxuICAgICAgICAgICAgICAgIFsnLS0nLCAnLS0nLCAwLCAnLS0nXVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxufTtcblxuaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJ25iYS5jb20nKSA+IC0xKXtcbiAgICB2YXIgZHVtbXlWYXIgPSAnJic7XG4gICAgdmFyIGZlZWRzID0ge1xuICAgICAgICB0b2RheXNTY29yZXM6ICdodHRwOi8vZGF0YS5uYmEuY29tL2RhdGEvdjIwMTUvanNvbi9tb2JpbGVfdGVhbXMvbmJhLzIwMTcvc2NvcmVzLzAwX3RvZGF5c19zY29yZXMuanNvbicsXG4gICAgICAgIGNlbHRpY3NSb3N0ZXI6ICdodHRwOi8vZGF0YS5uYmEuY29tL2RhdGEvdjIwMTUvanNvbi9tb2JpbGVfdGVhbXMvbmJhLzIwMTcvdGVhbXMvY2VsdGljc19yb3N0ZXIuanNvbicsXG4gICAgICAgIGF3YXlSb3N0ZXI6IGZ1bmN0aW9uKGF3YXlUbil7XG4gICAgICAgICAgICByZXR1cm4gJ2h0dHA6Ly9kYXRhLm5iYS5jb20vZGF0YS92MjAxNS9qc29uL21vYmlsZV90ZWFtcy9uYmEvMjAxNy90ZWFtcy8nICsgYXdheVRuICsgJ19yb3N0ZXIuanNvbic7XG4gICAgICAgIH0sXG4gICAgICAgIGJpb0RhdGE6ICdodHRwOi8vaW8uY25uLm5ldC9uYmEvbmJhLy5lbGVtZW50L21lZGlhLzIuMC90ZWFtc2l0ZXMvY2VsdGljcy9qc29uL2Jpby1kYXRhLmpzb24nLFxuICAgICAgICBwbGF5ZXJjYXJkOiBmdW5jdGlvbihwaWQpe1xuICAgICAgICAgICAgcmV0dXJuICdodHRwOi8vZGF0YS5uYmEuY29tL2RhdGEvdjIwMTUvanNvbi9tb2JpbGVfdGVhbXMvbmJhLzIwMTcvcGxheWVycy9wbGF5ZXJjYXJkXycgKyBwaWQgKyAnXzAyLmpzb24nO1xuICAgICAgICB9LFxuICAgICAgICBwbGF5ZXJjYXJkQXdheTogZnVuY3Rpb24ocGlkKXtcbiAgICAgICAgICAgIHJldHVybiAnaHR0cDovL2RhdGEubmJhLmNvbS9kYXRhL3YyMDE1L2pzb24vbW9iaWxlX3RlYW1zL25iYS8yMDE3L3BsYXllcnMvcGxheWVyY2FyZF8nICsgcGlkICsgJ18wMi5qc29uJztcbiAgICAgICAgfSxcbiAgICAgICAgZ2FtZWRldGFpbDogZnVuY3Rpb24oZ2lkKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2h0dHA6Ly9kYXRhLm5iYS5jb20vZGF0YS92MjAxNS9qc29uL21vYmlsZV90ZWFtcy9uYmEvMjAxNy9zY29yZXMvZ2FtZWRldGFpbC8nICsgZ2lkICsgJ19nYW1lZGV0YWlsLmpzb24nO1xuICAgICAgICB9LFxuICAgICAgICBzdGFuZGluZ3M6ICdodHRwOi8vZGF0YS5uYmEuY29tL2RhdGEvdjIwMTUvanNvbi9tb2JpbGVfdGVhbXMvbmJhLzIwMTcvMDBfc3RhbmRpbmdzLmpzb24nLFxuICAgICAgICBsZWFndWVMZWFkZXJzOiAnaHR0cDovL3N0YXRzLm5iYS5jb20vc3RhdHMvaG9tZXBhZ2V2Mj9HYW1lU2NvcGU9U2Vhc29uJkxlYWd1ZUlEPTAwJlBsYXllck9yVGVhbT1QbGF5ZXImUGxheWVyU2NvcGU9QWxsK1BsYXllcnMmU2Vhc29uPTIwMTctMTgmU2Vhc29uVHlwZT1SZWd1bGFyK1NlYXNvbiZTdGF0VHlwZT1UcmFkaXRpb25hbCZjYWxsYmFjaz0/J1xuICAgIH07XG59XG5lbHNlIHtcbiAgICB2YXIgZmVlZHMgPSB7XG4gICAgICAgIHRvZGF5c1Njb3JlczogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODg4OC9kYXRhL21vYmlsZS1zdGF0cy1mZWVkL3RvZGF5c19zY29yZXMuanNvbicsXG4gICAgICAgIGNlbHRpY3NSb3N0ZXI6ICdodHRwOi8vbG9jYWxob3N0Ojg4ODgvZGF0YS9tb2JpbGUtc3RhdHMtZmVlZC9jZWx0aWNzX3Jvc3Rlci5qc29uJyxcbiAgICAgICAgYXdheVJvc3RlcjogZnVuY3Rpb24oYXdheVRuKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODg4OC9kYXRhL21vYmlsZS1zdGF0cy1mZWVkL2F3YXlfcm9zdGVyLmpzb24nO1xuICAgICAgICB9LFxuICAgICAgICBiaW9EYXRhOiAnaHR0cDovL2xvY2FsaG9zdDo4ODg4L2RhdGEvYmlvLWRhdGEuanNvbicsXG4gICAgICAgIHBsYXllcmNhcmQ6IGZ1bmN0aW9uKHBpZCkge1xuICAgICAgICAgICAgcmV0dXJuICdodHRwOi8vbG9jYWxob3N0Ojg4ODgvZGF0YS9tb2JpbGUtc3RhdHMtZmVlZC9wbGF5ZXJjYXJkcy9wbGF5ZXJjYXJkLScgKyBwaWQgKyAnLmpzb24nO1xuICAgICAgICB9LFxuICAgICAgICBwbGF5ZXJjYXJkQXdheTogZnVuY3Rpb24ocGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODg4OC9kYXRhL21vYmlsZS1zdGF0cy1mZWVkL3BsYXllcmNhcmRzL3BsYXllcmNhcmQtMjAyMzMwLmpzb24nO1xuICAgICAgICB9LFxuICAgICAgICBnYW1lZGV0YWlsOiBmdW5jdGlvbihnaWQpIHtcbiAgICAgICAgICAgIHJldHVybiAnaHR0cDovL2xvY2FsaG9zdDo4ODg4L2RhdGEvbW9iaWxlLXN0YXRzLWZlZWQvZ2FtZWRldGFpbC5qc29uJztcbiAgICAgICAgfSxcbiAgICAgICAgc3RhbmRpbmdzOiAnaHR0cDovL2xvY2FsaG9zdDo4ODg4L2RhdGEvbW9iaWxlLXN0YXRzLWZlZWQvc3RhbmRpbmdzLmpzb24nLFxuICAgICAgICBsZWFndWVMZWFkZXJzOiAnaHR0cDovL2xvY2FsaG9zdDo4ODg4L2RhdGEvbGVhZ3VlX2xlYWRlcnMuanNvbidcbiAgICB9O1xufVxuXG52YXIgZ2FtZVN0YXJ0ZWQgPSBmYWxzZTtcbmxldCBwbGF5ZXJTcG90bGlnaHRDb3VudGVyID0gMTtcbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgYWxsU3RhcigpO1xuICAgIHZhciBnaWQgPSAnJztcbiAgICB2YXIgYXdheVRlYW0gPSAnJztcbiAgICB2YXIgYXdheVRuID0gJyc7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBsZWZ0V3JhcENvdW50ZXIgPSBmYWxzZTtcbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgIHVybDogZmVlZHMudG9kYXlzU2NvcmVzLFxuICAgICAgICBhc3luYzogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHRvZGF5c1Njb3Jlc0RhdGEpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9kYXlzU2NvcmVzRGF0YS5ncy5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvZGF5c1Njb3Jlc0RhdGEuZ3MuZ1tpXS5oLnRhID09ICdCT1MnKSB7IC8vQ0hBTkdFIFRISVNcbiAgICAgICAgICAgICAgICAgICAgYXdheVRlYW0gPSB0b2RheXNTY29yZXNEYXRhLmdzLmdbaV0udi50YTtcbiAgICAgICAgICAgICAgICAgICAgYXdheVRuID0gdG9kYXlzU2NvcmVzRGF0YS5ncy5nW2ldLnYudG4udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZ2lkID0gdG9kYXlzU2NvcmVzRGF0YS5ncy5nW2ldLmdpZDtcbiAgICAgICAgICAgICAgICAgICAgbG9hZFJvc3RlckRhdGEoYXdheVRlYW0sIGF3YXlUbik7XG4gICAgICAgICAgICAgICAgICAgIHNjb3Jlc0luaXQodG9kYXlzU2NvcmVzRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YW5kaW5nc0luaXQoYXdheVRlYW0pO1xuICAgICAgICAgICAgICAgICAgICBsZWFndWVMZWFkZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIGxlZnRXcmFwKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRSQU5TSVRJT05TXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGN5Y2xlKCkge1xuLyogICAgICAgICAgICAgICAgICAgICAgICBtb2JpbGVBcHAoKTsqLyAvLyBEVVJBVElPTjogMjUwMDBcbi8qICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChhbGxTdGFyLCAwKTsqL1xuLyogICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYWRlcnMoZ2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDI1MDAwKTsqLyAvLyBEVVJBVElPTjogNDQxMDBcbi8qICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoc29jaWFsLCA2OTAwMCk7ICovLy9EVVJBVElPTjogMTUwMDAwXG4vKiAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyU3BvdGxpZ2h0KHJvc3Rlck9iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LDg1MDAwKSovOyAvL0RVUkFUSU9OOiA0MDAwMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN5Y2xlKCk7XG4vKiAgICAgICAgICAgICAgICAgICAgc2V0SW50ZXJ2YWwoY3ljbGUsIDEyMzAwMCk7Ki9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBjeWNsZSgpIHt9XG4vKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG49ICAgICAgICAgICAgTUlTQyBGVU5DVElPTlMgICAgICAgICAgICA9XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5mdW5jdGlvbiBwbGF5ZXJBZ2UoZG9iKSB7XG4gICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB2YXIgYmlydGhEYXRlID0gbmV3IERhdGUoZG9iKTtcbiAgICB2YXIgYWdlID0gdG9kYXkuZ2V0RnVsbFllYXIoKSAtIGJpcnRoRGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIHJldHVybiBhZ2U7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVGltZWxpbmUoc2VsZWN0ZWRQbGF5ZXIpIHtcbiAgICAvLyBBUFBFTkQ6IFRJTUVMSU5FXG4gICAgdmFyIHNlYXNvbnNQbGF5ZWQgPSByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbc2VsZWN0ZWRQbGF5ZXJdLnN0YXRzLnNhLmxlbmd0aDtcbiAgICB2YXIgdGltZWxpbmVIVE1MID0gJyc7XG4gICAgdmFyIHNlYXNvblllYXJIVE1MID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWFzb25zUGxheWVkOyBpKyspIHtcbiAgICAgICAgdmFyIHRlYW1BYmJyZXZpYXRpb24gPSByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbc2VsZWN0ZWRQbGF5ZXJdLnN0YXRzLnNhW2ldLnRhO1xuICAgICAgICB2YXIgdHJhZGVkID0gcm9zdGVyT2JqLmNlbHRpY3Mucm9zdGVyW3NlbGVjdGVkUGxheWVyXS5zdGF0cy5zYVtpXS5zcGwubGVuZ3RoO1xuICAgICAgICB2YXIgc2VnbWVudElubmVyID0gXCJcIjtcbiAgICAgICAgdmFyIHRpdGxlID0gXCJcIjtcbiAgICAgICAgdmFyIHNlYXNvblllYXJUZXh0ID0gcm9zdGVyT2JqLmNlbHRpY3Mucm9zdGVyW3NlbGVjdGVkUGxheWVyXS5zdGF0cy5zYVtpXS52YWw7XG4gICAgICAgIGlmIChpID09PSAwIHx8IHRlYW1BYmJyZXZpYXRpb24gIT09IHJvc3Rlck9iai5jZWx0aWNzLnJvc3RlcltzZWxlY3RlZFBsYXllcl0uc3RhdHMuc2FbaSAtIDFdLnRhKSB7IC8vIElmIHRoaXMgaXMgYSBuZXcgdGVhbSwgc3RhcnQgdGhlIHRlYW0gd3JhcC5cbiAgICAgICAgICAgIHRpdGxlID0gdGVhbUFiYnJldmlhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhZGVkKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHRyYWRlZDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdwVG90ID0gcm9zdGVyT2JqLmNlbHRpY3Mucm9zdGVyW3NlbGVjdGVkUGxheWVyXS5zdGF0cy5zYVtpXS5ncDtcbiAgICAgICAgICAgICAgICB2YXIgZ3AgPSByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbc2VsZWN0ZWRQbGF5ZXJdLnN0YXRzLnNhW2ldLnNwbFt4XS5ncDtcbiAgICAgICAgICAgICAgICB2YXIgZ3BQZXJjZW50YWdlID0gTWF0aC5yb3VuZCgoZ3AgLyBncFRvdCkgKiAxMDApO1xuICAgICAgICAgICAgICAgIHRlYW1BYmJyZXZpYXRpb24gPSByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbc2VsZWN0ZWRQbGF5ZXJdLnN0YXRzLnNhW2ldLnNwbFt4XS50YTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCB8fCB0ZWFtQWJicmV2aWF0aW9uICE9PSByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbc2VsZWN0ZWRQbGF5ZXJdLnN0YXRzLnNhW2kgLSAxXS50YSAmJiB0ZWFtQWJicmV2aWF0aW9uICE9PSByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbc2VsZWN0ZWRQbGF5ZXJdLnN0YXRzLnNhW2kgKyAxXS50YSkgeyAvLyBJZiB0aGlzIGlzIGEgbmV3IHRlYW0sIHN0YXJ0IHRoZSB0ZWFtIHdyYXAuXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlID0gdGVhbUFiYnJldmlhdGlvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlZ21lbnRJbm5lciArPSAnPGRpdiBkYXRhLXNlYXNvbi15ZWFyPVwiJyArIHNlYXNvblllYXJUZXh0ICsgJ1wiIGRhdGEtdGVhbT1cIicgKyB0ZWFtQWJicmV2aWF0aW9uICsgJ1wiIHN0eWxlPVwiXCIgY2xhc3M9XCJzZWdtZW50LWlubmVyICcgKyB0ZWFtQWJicmV2aWF0aW9uICsgJy1iZ1wiPjxwPicgKyB0aXRsZSArICc8L3A+PC9kaXY+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlZ21lbnRJbm5lciA9ICc8ZGl2IGRhdGEtc2Vhc29uLXllYXI9XCInICsgc2Vhc29uWWVhclRleHQgKyAnXCIgZGF0YS10ZWFtPVwiJyArIHRlYW1BYmJyZXZpYXRpb24gKyAnXCIgY2xhc3M9XCJzZWdtZW50LWlubmVyICcgKyB0ZWFtQWJicmV2aWF0aW9uICsgJy1iZ1wiPjxwPicgKyB0aXRsZSArICc8L3A+PC9kaXY+JztcbiAgICAgICAgfVxuICAgICAgICB0aW1lbGluZUhUTUwgKz0gJzxkaXYgY2xhc3M9XCJzZWdtZW50XCI+JyArIHNlZ21lbnRJbm5lciArICc8L2Rpdj4nO1xuICAgICAgICBzZWFzb25ZZWFySFRNTCArPSAnPGRpdiBjbGFzcz1cInNlZ21lbnRcIj48cD4nICsgc2Vhc29uWWVhclRleHQgKyAnPC9wPjwvZGl2Pic7XG4gICAgfVxuICAgIGpRdWVyeShcIi50aW1lbGluZS13cmFwXCIpLmh0bWwoJzxkaXYgY2xhc3M9XCJ0aW1lbGluZSBhcHBlbmRlZFwiPicgKyB0aW1lbGluZUhUTUwgKyAnPC9kaXY+PGRpdiBjbGFzcz1cInNlYXNvbi15ZWFyIGFwcGVuZGVkXCI+JyArIHNlYXNvblllYXJIVE1MICsgJzwvZGl2PicpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbmRleChrZXlzLCBhcnJheSkge1xuICAgIHZhciBuZXdBcnIgPSBrZXlzLm1hcChpdGVtID0+IGFycmF5LmluZGV4T2YoaXRlbSkpO1xuICAgIHJldHVybiBuZXdBcnI7XG59XG5cbmZ1bmN0aW9uIHJvdW5kKG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgbnVtYmVyICE9PSBcIm51bWJlclwiIHx8IG51bWJlciA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVtYmVyLnRvRml4ZWQoMSk7XG4gICAgfVxufVxuLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG49ICAgICAgICAgICAgSU5JVElBTElaRSAgICAgICAgICAgID1cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuZnVuY3Rpb24gY2hlY2tHYW1lU3RhdHVzKCkge1xuICAgIGlmICghZ2FtZVN0YXJ0ZWQpIHtcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBmZWVkcy50b2RheXNTY29yZXMsXG4gICAgICAgICAgICBhc3luYzogZmFsc2UsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciBnaWQgPSAnJztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YWRhdGEuZ3MuZ1tpXS5oLnRhID09ICdCT1MnICYmIGRhdGFkYXRhLmdzLmdbaV0uc3QgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZVN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dhbWVzdGFydGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZ2FtZVN0YXJ0ZWQ7XG59O1xuLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbj0gICAgICAgICAgICBMT0FEIFJPU1RFUiBJTkZPIChidWlsZCByb3N0ZXJPYmopICAgICAgICAgICAgICA9XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuZnVuY3Rpb24gbG9hZFJvc3RlckRhdGEoYXdheVRlYW0sIGF3YXlUbikge1xuICAgIHZhciByb3N0ZXIgPSAnJztcbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgIHVybDogZmVlZHMuY2VsdGljc1Jvc3RlcixcbiAgICAgICAgYXN5bmM6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICByb3N0ZXIgPSBkYXRhO1xuICAgICAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gcm9zdGVyLnQpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkgIT09ICdwbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9zdGVyT2JqLmNlbHRpY3NbcHJvcGVydHldID0gcm9zdGVyLnRbcHJvcGVydHldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge31cbiAgICB9KTtcbiAgICB2YXIgYXdheVJvc3RlciA9ICcnO1xuICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgdXJsOiBmZWVkcy5hd2F5Um9zdGVyKGF3YXlUbiksXG4gICAgICAgIGFzeW5jOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgYXdheVJvc3RlciA9IGRhdGE7XG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBhd2F5Um9zdGVyLnQpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkgIT09ICdwbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9zdGVyT2JqLmF3YXlbcHJvcGVydHldID0gYXdheVJvc3Rlci50W3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHt9XG4gICAgfSk7XG4gICAgdmFyIGJpb0RhdGEgPSAnJztcbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgIHVybDogZmVlZHMuYmlvRGF0YSxcbiAgICAgICAgYXN5bmM6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBiaW9EYXRhID0gZGF0YTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge31cbiAgICB9KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvc3Rlci50LnBsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwaWQgPSByb3N0ZXIudC5wbFtpXS5waWQ7XG4gICAgICAgIHJvc3Rlck9iai5jZWx0aWNzLnJvc3RlcltwaWRdID0gcm9zdGVyLnQucGxbaV07XG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIGJpb0RhdGFbcGlkXSkge1xuICAgICAgICAgICAgcm9zdGVyT2JqLmNlbHRpY3Mucm9zdGVyW3BpZF0uYmlvID0gYmlvRGF0YVtwaWRdO1xuICAgICAgICB9O1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGZlZWRzLnBsYXllcmNhcmQocGlkKSxcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wbC5jYS5oYXNPd25Qcm9wZXJ0eSgnc2EnKSkge1xuICAgICAgICAgICAgICAgICAgICByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbcGlkXS5zdGF0cyA9IGRhdGEucGwuY2Euc2FbKGRhdGEucGwuY2Euc2EubGVuZ3RoIC0gMSldO1xuICAgICAgICAgICAgICAgICAgICByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbcGlkXS5zdGF0cy5zYSA9IGRhdGEucGwuY2Euc2E7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcm9zdGVyT2JqLmNlbHRpY3Mucm9zdGVyW3BpZF0uc3RhdHMgPSBkYXRhLnBsLmNhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbcGlkXS5zdGF0cy5wdHMgPSByb3VuZChyb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbcGlkXS5zdGF0cy5wdHMpO1xuICAgICAgICAgICAgICAgIHJvc3Rlck9iai5jZWx0aWNzLnJvc3RlcltwaWRdLnN0YXRzLmFzdCA9IHJvdW5kKHJvc3Rlck9iai5jZWx0aWNzLnJvc3RlcltwaWRdLnN0YXRzLmFzdCk7XG4gICAgICAgICAgICAgICAgcm9zdGVyT2JqLmNlbHRpY3Mucm9zdGVyW3BpZF0uc3RhdHMucmViID0gcm91bmQocm9zdGVyT2JqLmNlbHRpY3Mucm9zdGVyW3BpZF0uc3RhdHMucmViKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7fVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhd2F5Um9zdGVyLnQucGwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBpZCA9IGF3YXlSb3N0ZXIudC5wbFtpXS5waWQ7XG4gICAgICAgIHJvc3Rlck9iai5hd2F5LnJvc3RlcltwaWRdID0gYXdheVJvc3Rlci50LnBsW2ldO1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGZlZWRzLnBsYXllcmNhcmRBd2F5KHBpZCksIC8vIENIQU5HRSBQSURcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wbC5jYS5oYXNPd25Qcm9wZXJ0eSgnc2EnKSkge1xuICAgICAgICAgICAgICAgICAgICByb3N0ZXJPYmouYXdheS5yb3N0ZXJbcGlkXS5zdGF0cyA9IGRhdGEucGwuY2Euc2FbKGRhdGEucGwuY2Euc2EubGVuZ3RoIC0gMSldO1xuICAgICAgICAgICAgICAgICAgICByb3N0ZXJPYmouYXdheS5yb3N0ZXJbcGlkXS5zdGF0cy5zYSA9IGRhdGEucGwuY2Euc2E7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcm9zdGVyT2JqLmF3YXkucm9zdGVyW3BpZF0uc3RhdHMgPSBkYXRhLnBsLmNhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByb3N0ZXJPYmouYXdheS5yb3N0ZXJbcGlkXS5zdGF0cy5wdHMgPSByb3VuZChyb3N0ZXJPYmouYXdheS5yb3N0ZXJbcGlkXS5zdGF0cy5wdHMpO1xuICAgICAgICAgICAgICAgIHJvc3Rlck9iai5hd2F5LnJvc3RlcltwaWRdLnN0YXRzLmFzdCA9IHJvdW5kKHJvc3Rlck9iai5hd2F5LnJvc3RlcltwaWRdLnN0YXRzLmFzdCk7XG4gICAgICAgICAgICAgICAgcm9zdGVyT2JqLmF3YXkucm9zdGVyW3BpZF0uc3RhdHMucmViID0gcm91bmQocm9zdGVyT2JqLmF3YXkucm9zdGVyW3BpZF0uc3RhdHMucmViKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7fVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZm9yICh2YXIgdGVhbSBpbiByb3N0ZXJPYmopIHtcbiAgICAgICAgZm9yICh2YXIgcGxheWVyIGluIHJvc3Rlck9ialt0ZWFtXS5yb3N0ZXIpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHN0YXQgaW4gcm9zdGVyT2JqW3RlYW1dLmxlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICByb3N0ZXJPYmpbdGVhbV0ubGVhZGVyc1tzdGF0XS5wdXNoKFtyb3N0ZXJPYmpbdGVhbV0ucm9zdGVyW3BsYXllcl0uZm4udG9VcHBlckNhc2UoKSwgcm9zdGVyT2JqW3RlYW1dLnJvc3RlcltwbGF5ZXJdLmxuLnRvVXBwZXJDYXNlKCksIHJvc3Rlck9ialt0ZWFtXS5yb3N0ZXJbcGxheWVyXS5zdGF0c1tzdGF0XSwgcm9zdGVyT2JqW3RlYW1dLnJvc3RlcltwbGF5ZXJdLnBpZF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIHRlYW0gaW4gcm9zdGVyT2JqKSB7XG4gICAgICAgIGZvciAodmFyIHN0YXQgaW4gcm9zdGVyT2JqW3RlYW1dLmxlYWRlcnMpIHtcbiAgICAgICAgICAgIHJvc3Rlck9ialt0ZWFtXS5sZWFkZXJzW3N0YXRdLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBiWzJdIC0gYVsyXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdTT1JURUQ6Jyk7XG4gICAgY29uc29sZS5sb2cocm9zdGVyT2JqKTtcbn07XG5cbmZ1bmN0aW9uIHN0YXRzTm90QXZhaWxhYmxlKHBpZCkge1xuICAgIHJvc3Rlck9ialtwaWRdLnN0YXRzID0ge307XG4gICAgcm9zdGVyT2JqW3BpZF0uc3RhdHMuc2EgPSBbe31dO1xuICAgIHJvc3Rlck9ialtwaWRdLnN0YXRzLmhhc1N0YXRzID0gZmFsc2U7XG4gICAgdmFyIGNhSW5kZXggPSBbJ2dwJywgJ2dzJywgJ21pbicsICdmZ3AnLCAndHBwJywgJ2Z0cCcsICdvcmViJywgJ2RyZWInLCAncmViJywgJ2FzdCcsICdzdGwnLCAnYmxrJywgJ3RvdicsICdwZicsICdwdHMnLCAnbm9zdGF0cyddO1xuICAgIHZhciBzYUluZGV4ID0gWyd0aWQnLCAndmFsJywgJ2dwJywgJ2dzJywgJ21pbicsICdmZ3AnLCAndHBwJywgJ2Z0cCcsICdvcmViJywgJ2RyZWInLCAncmViJywgJ2FzdCcsICdzdGwnLCAnYmxrJywgJ3RvdicsICdwZicsICdwdHMnLCAnc3BsJywgJ3RhJywgJ3RuJywgJ3RjJ107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzYUluZGV4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJvc3Rlck9ialtwaWRdLnN0YXRzLnNhWzBdW3NhSW5kZXhbaV1dID0gXCJOL0FcIjtcbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIHJvc3Rlck9ialtwaWRdLnN0YXRzLnNhWzBdW3NhSW5kZXhbaV1dID0gcGxheWVyQ2FyZFllYXIudG9TdHJpbmcoKS5zdWJzdHIoMiwgMikgKyBcIi1cIiArIChwbGF5ZXJDYXJkWWVhciArIDEpLnRvU3RyaW5nKCkuc3Vic3RyKDIsIDIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSAxNykge1xuICAgICAgICAgICAgcm9zdGVyT2JqW3BpZF0uc3RhdHMuc2FbMF1bc2FJbmRleFtpXV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gMTgpIHtcbiAgICAgICAgICAgIHJvc3Rlck9ialtwaWRdLnN0YXRzLnNhWzBdW3NhSW5kZXhbaV1dID0gJ0JPUyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYUluZGV4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJvc3Rlck9ialtwaWRdLnN0YXRzW2NhSW5kZXhbaV1dID0gXCJOL0FcIjtcbiAgICAgICAgaWYgKGkgPT09IDE1KSB7XG4gICAgICAgICAgICByb3N0ZXJPYmpbcGlkXS5zdGF0c1tjYUluZGV4W2ldXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5mdW5jdGlvbiBsb2FkR2FtZURldGFpbChnaWQpIHt9O1xuXG5mdW5jdGlvbiBsb2FkQXdheVRlYW1EYXRhKCkge31cbi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuPSAgICAgICAgICAgIFJJR0hUIFdSQVAgICAgICAgICAgICA9XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbmZ1bmN0aW9uIHBsYXllclNwb3RsaWdodChyb3N0ZXJPYmopIHtcbiAgICAvKiAxIC0gV0hJVEUgTElORSBIT1JJWlRPTkFMICovXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KCcud2hpdGUtbGluZS5ob3Jpem9udGFsJykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24tMScpO1xuICAgIH0sIDUwMCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KCcuc29jaWFsLXRvcCAud2hpdGUtbGluZS52ZXJ0aWNhbDpudGgtY2hpbGQob2RkKScpLmFkZENsYXNzKCd0cmFuc2l0aW9uLTEnKTtcbiAgICAgICAgalF1ZXJ5KCcuc29jaWFsLWJvdHRvbSAud2hpdGUtbGluZS52ZXJ0aWNhbDpudGgtY2hpbGQoZXZlbiknKS5hZGRDbGFzcygndHJhbnNpdGlvbi0xJyk7XG4gICAgfSwgODAwKTtcbiAgICAvKiAyYiAtIFdISVRFIExJTkUgVkVSVElDQUwgKi9cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJy5zb2NpYWwtdG9wIC53aGl0ZS1saW5lLnZlcnRpY2FsOm50aC1jaGlsZChldmVuKScpLmFkZENsYXNzKCd0cmFuc2l0aW9uLTEnKTtcbiAgICAgICAgalF1ZXJ5KCcuc29jaWFsLWJvdHRvbSAud2hpdGUtbGluZS52ZXJ0aWNhbDpudGgtY2hpbGQob2RkKScpLmFkZENsYXNzKCd0cmFuc2l0aW9uLTEnKTtcbiAgICB9LCAxMDAwKTtcbiAgICAvKiAzIC0gR0VORVJBVEUgQU5EIFJFVkVBTCBQTEFZRVIgQk9YRVMgKi9cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJy5zb2NpYWwtdG9wLCAuc29jaWFsLWJvdHRvbScpLmFkZENsYXNzKCd0cmFuc2l0aW9uLTEnKTtcbiAgICAgICAgalF1ZXJ5KCcucGxheWVyLWJveC13cmFwJykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24tMScpO1xuICAgIH0sIDEyMDApO1xuICAgIC8qIDQgLSBBUFBFTkQgSEVBRFNIT1RTICovXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KCcucGxheWVyLWJveC13cmFwJykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24tMicpO1xuICAgICAgICBqUXVlcnkoJy5wbGF5ZXItYm94JykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24tMScpO1xuICAgICAgICB2YXIgZGVsYXkgPSAwO1xuICAgICAgICB2YXIgZm9yaW5Db3VudGVyID0gMDtcbiAgICAgICAgZm9yICh2YXIgcGxheWVyIGluIHJvc3Rlck9iai5jZWx0aWNzLnJvc3Rlcikge1xuICAgICAgICAgICAgdmFyIGhlYWRzaG90ID0gJ2h0dHBzOi8vYWstc3RhdGljLmNtcy5uYmEuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy9oZWFkc2hvdHMvbmJhL2xhdGVzdC8xMDQweDc2MC8nICsgcm9zdGVyT2JqLmNlbHRpY3Mucm9zdGVyW3BsYXllcl0ucGlkICsgJy5wbmcnO1xuICAgICAgICAgICAgalF1ZXJ5KCcucGxheWVyLWJveDpudGgtY2hpbGQoJyArIChmb3JpbkNvdW50ZXIgKyAxKSArICcpJykuYXBwZW5kKCc8aW1nIGNsYXNzPVwiYXBwZW5kZWQgaGVhZHNob3RcIiBzcmM9XCInICsgaGVhZHNob3QgKyAnXCIvPicpO1xuICAgICAgICAgICAgalF1ZXJ5KCcucGxheWVyLWJveDpudGgtY2hpbGQoJyArIChmb3JpbkNvdW50ZXIgKyAxKSArICcpJykuYXR0cignZGF0YS1waWQnLCByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbcGxheWVyXS5waWQpO1xuICAgICAgICAgICAgalF1ZXJ5KCcucGxheWVyLWJveCBpbWcnKS5vbihcImVycm9yXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGpRdWVyeSh0aGlzKS5hdHRyKCdzcmMnLCAnaHR0cHM6Ly9pLmNkbi50dXJuZXIuY29tL25iYS9uYmEvLmVsZW1lbnQvbWVkaWEvMi4wL3RlYW1zaXRlcy9jZWx0aWNzL21lZGlhL2dlbmVyaWMtcGxheWVyLWxpZ2h0XzYwMHg0MzgucG5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGpRdWVyeSgnLnBsYXllci1ib3g6bnRoLWNoaWxkKCcgKyAoZm9yaW5Db3VudGVyICsgMSkgKyAnKSBpbWcnKS5kZWxheShkZWxheSkuZmFkZVRvKDMwMCwgMSk7XG4gICAgICAgICAgICBkZWxheSArPSAzMDtcbiAgICAgICAgICAgIGZvcmluQ291bnRlcisrO1xuICAgICAgICB9XG4gICAgfSwgMTcwMCk7XG4gICAgLyogNSAtIFBMQVlFUiBTRUxFQ1QgKi9cbiAgICB2YXIgc2VsZWN0ZWRQbGF5ZXIgPSAnJztcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJy5wbGF5ZXItYm94JykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24tMicpO1xuICAgICAgICBqUXVlcnkoJy5wbGF5ZXItYm94Om50aC1jaGlsZCgnICsgKHBsYXllclNwb3RsaWdodENvdW50ZXIpICsgJyknKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgc2VsZWN0ZWRQbGF5ZXIgPSBqUXVlcnkoJy5wbGF5ZXItYm94Om50aC1jaGlsZCgnICsgKHBsYXllclNwb3RsaWdodENvdW50ZXIpICsgJyknKS5hdHRyKCdkYXRhLXBpZCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBqUXVlcnkoJy5wbGF5ZXItYm94Jykubm90KCcucmVwbGFjZW1lbnQuc2VsZWN0ZWQnKS5hZGRDbGFzcygndHJhbnNpdGlvbi00Jyk7XG4gICAgICAgIH0sODAwKTtcbiAgICB9LCAzMDAwKTtcbiAgICAvKiA2IC0gUExBWUVSIEJPWCBFWFBBTkQgKi9cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJy5ibG9jay13cmFwLnNvY2lhbCcpLmFkZENsYXNzKCd0cmFuc2l0aW9uLTMnKTtcbiAgICAgICAgalF1ZXJ5KCcucGxheWVyLWJveC5yZXBsYWNlbWVudC5zZWxlY3RlZCcpLmFkZENsYXNzKCd0cmFuc2l0aW9uLTMnKTtcbiAgICB9LCA0MDAwKTtcbiAgICAvKiA3IC0gU1BPVExJR0hUIEhUTUwgKi9cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBnZW5lcmF0ZVRpbWVsaW5lKHNlbGVjdGVkUGxheWVyKTtcbiAgICAgICAgalF1ZXJ5KCcucGxheWVyLWJveC5yZXBsYWNlbWVudC5zZWxlY3RlZCcpLmNsb25lKCkuYXBwZW5kVG8oJy5ibG9jay13cmFwLnBsYXllci1zcG90bGlnaHQgLnRvcC13cmFwJyk7XG4gICAgICAgIGpRdWVyeSgnLnBsYXllci1zcG90bGlnaHQgLnNlbGVjdGVkJykuYWRkQ2xhc3MoJy5hcHBlbmRlZCcpO1xuICAgICAgICBqUXVlcnkoJy5ibG9jay13cmFwLnBsYXllci1zcG90bGlnaHQnKS5hZGRDbGFzcygndHJhbnNpdGlvbi0xJyk7XG4gICAgICAgIGpRdWVyeSgnLmJsb2NrLXdyYXAuc29jaWFsJykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24tMScpO1xuICAgICAgICB2YXIgc3RhdHMgPSByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbc2VsZWN0ZWRQbGF5ZXJdLnN0YXRzO1xuICAgICAgICBqUXVlcnkoJy5wbGF5ZXItc3BvdGxpZ2h0IC50b3Atd3JhcCAucGxheWVyLXRvcCcpLmFwcGVuZCgnPGltZyBjbGFzcz1cInNpbG8gYXBwZW5kZWRcIiBzcmM9XCJodHRwOi8vaW8uY25uLm5ldC9uYmEvbmJhLy5lbGVtZW50L21lZGlhLzIuMC90ZWFtc2l0ZXMvY2VsdGljcy9tZWRpYS9zaWxvLTQ2Nng1OTEtJyArIHJvc3Rlck9iai5jZWx0aWNzLnJvc3RlcltzZWxlY3RlZFBsYXllcl0ucGlkICsgJy5wbmdcIiAvPjxkaXYgY2xhc3M9XCJ0b3AgYXBwZW5kZWRcIj48ZGl2IGNsYXNzPVwicGxheWVyLW5hbWUtd3JhcFwiPjxwIGNsYXNzPVwicGxheWVyLW5hbWVcIj48c3Bhbj4nICsgcm9zdGVyT2JqLmNlbHRpY3Mucm9zdGVyW3NlbGVjdGVkUGxheWVyXS5mbi50b1VwcGVyQ2FzZSgpICsgJzwvc3Bhbj4gPGJyPiAnICsgcm9zdGVyT2JqLmNlbHRpY3Mucm9zdGVyW3NlbGVjdGVkUGxheWVyXS5sbi50b1VwcGVyQ2FzZSgpICsgJzwvcD48L2Rpdj48cCBjbGFzcz1cInBsYXllci1udW1iZXJcIj4nICsgcm9zdGVyT2JqLmNlbHRpY3Mucm9zdGVyW3NlbGVjdGVkUGxheWVyXS5udW0gKyAnPC9icj48c3Bhbj4nICsgcm9zdGVyT2JqLmNlbHRpY3Mucm9zdGVyW3NlbGVjdGVkUGxheWVyXS5wb3MgKyAnPC9zcGFuPjwvcD48L2Rpdj48ZGl2IGNsYXNzPVwibWlkZGxlIGFwcGVuZGVkXCI+PHVsIGNsYXNzPVwiaW5mbyBjbGVhcmZpeFwiPjxsaT48cD5BR0U8c3BhbiBjbGFzcz1cInNtLWhpZGVcIj46Jm5ic3A7PC9zcGFuPiA8L2JyPjxzcGFuIGNsYXNzPVwiaW5mby12YWx1ZVwiPicgKyBwbGF5ZXJBZ2Uocm9zdGVyT2JqLmNlbHRpY3Mucm9zdGVyW3NlbGVjdGVkUGxheWVyXS5kb2IpICsgJzwvc3Bhbj48L3A+PC9saT48bGk+PHA+SFQ8c3BhbiBjbGFzcz1cInNtLWhpZGVcIj46Jm5ic3A7PC9zcGFuPiA8L2JyPjxzcGFuIGNsYXNzPVwiaW5mby12YWx1ZVwiPicgKyByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbc2VsZWN0ZWRQbGF5ZXJdLmh0ICsgJzwvc3Bhbj48L3A+PC9saT48bGk+PHA+V1Q8c3BhbiBjbGFzcz1cInNtLWhpZGVcIj46Jm5ic3A7PC9zcGFuPiA8L2JyPjxzcGFuIGNsYXNzPVwiaW5mby12YWx1ZVwiPicgKyByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbc2VsZWN0ZWRQbGF5ZXJdLnd0ICsgJzwvc3Bhbj48L3A+PC9saT48L3VsPjwvZGl2PjxkaXYgY2xhc3M9XCJib3R0b20gZnVsbCBjbGVhcmZpeCBzbS1oaWRlIGFwcGVuZGVkXCI+PHRhYmxlIGNsYXNzPVwiYXZlcmFnZXNcIj48dHIgY2xhc3M9XCJhdmVyYWdlcy1sYWJlbHNcIj48dGQ+PHA+R1A8L3A+PC90ZD48dGQ+PHA+UFBHPC9wPjwvdGQ+PHRkPjxwPlJQRzwvcD48L3RkPjx0ZD48cD5BUEc8L3A+PC90ZD48L3RyPjx0ciBjbGFzcz1cImF2ZXJhZ2VzLXNlYXNvblwiPjx0ZCBjbGFzcz1cImdwXCI+PHA+PC9wPjwvdGQ+PHRkIGNsYXNzPVwicHRzXCI+PHA+PC9wPjwvdGQ+PHRkIGNsYXNzPVwicmViXCI+PHA+PC9wPjwvdGQ+PHRkIGNsYXNzPVwiYXN0XCI+PHA+PC9wPjwvdGQ+PC90cj48L3RhYmxlPjwvZGl2PicpO1xuICAgICAgICBqUXVlcnkoXCIucGxheWVyLXNwb3RsaWdodCAuYXZlcmFnZXMtc2Vhc29uXCIpLmh0bWwoJzx0ZCBjbGFzcz1cImFwcGVuZGVkXCI+PHA+JyArIHN0YXRzLnNhWzBdLmdwICsgJzwvcD48L3RkPjx0ZCBjbGFzcz1cImFwcGVuZGVkXCI+PHA+JyArIHN0YXRzLnNhWzBdLnB0cyArICc8L3A+PC90ZD48dGQgY2xhc3M9XCJhcHBlbmRlZFwiPjxwPicgKyBzdGF0cy5zYVswXS5yZWIgKyAnPC9wPjwvdGQ+PHRkIGNsYXNzPVwiYXBwZW5kZWRcIj48cD4nICsgc3RhdHMuc2FbMF0uYXN0ICsgJzwvcD48L3RkPicpO1xuICAgICAgICBqUXVlcnkoJy5wbGF5ZXItc3BvdGxpZ2h0IC5wbGF5ZXItbmFtZScpLmZhZGVUbygyMDAsIDEpO1xuICAgICAgICB2YXIgcGxheWVyRmFjdHMgPSByb3N0ZXJPYmouY2VsdGljcy5yb3N0ZXJbc2VsZWN0ZWRQbGF5ZXJdLmJpby5wZXJzb25hbDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpIDw9IHJvc3Rlck9iai5jZWx0aWNzLnJvc3RlcltzZWxlY3RlZFBsYXllcl0uYmlvLnBlcnNvbmFsLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcucGxheWVyLXNwb3RsaWdodCAuYm90dG9tLXdyYXAnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJkeWstYm94IGFwcGVuZGVkXCI+PHA+JyArIHBsYXllckZhY3RzW2ldICsgJzwvcD48L2Rpdj4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgalF1ZXJ5KCcucGxheWVyLXNwb3RsaWdodCAuYm90dG9tLXdyYXAnKS5hZGRDbGFzcygndHJhbnNpdGlvbi0xJyk7XG4gICAgICAgIGlmIChqUXVlcnkoJy5wbGF5ZXItc3BvdGxpZ2h0IC5ib3R0b20td3JhcCAuZHlrLWJveCcpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcucGxheWVyLXNwb3RsaWdodCAuYm90dG9tLXdyYXAgLmR5ay1ib3g6bnRoLW9mLXR5cGUoMiknKS5hZGRDbGFzcygndHJhbnNpdGlvbi0yJyk7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcucGxheWVyLXNwb3RsaWdodCAuYm90dG9tLXdyYXAgLmR5ay1ib3g6bnRoLW9mLXR5cGUoMyknKS5hZGRDbGFzcygndHJhbnNpdGlvbi0xJyk7XG4gICAgICAgICAgICB9LCAxMDAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGpRdWVyeSgnLnBsYXllci1zcG90bGlnaHQgLmJvdHRvbS13cmFwIC5keWstYm94JykubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5wbGF5ZXItc3BvdGxpZ2h0IC5ib3R0b20td3JhcCAuZHlrLWJveDpudGgtb2YtdHlwZSgzKScpLmFkZENsYXNzKCd0cmFuc2l0aW9uLTInKTtcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5wbGF5ZXItc3BvdGxpZ2h0IC5ib3R0b20td3JhcCAuZHlrLWJveDpudGgtb2YtdHlwZSg0KScpLmFkZENsYXNzKCd0cmFuc2l0aW9uLTEnKTtcbiAgICAgICAgICAgIH0sIDIwMDAwKTtcbiAgICAgICAgfVxuICAgIH0sIDUwMDApO1xuICAgIC8qIDggLSBTUE9UTElHSFQgU0xJREUgSU4gKi9cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJy5wbGF5ZXItc3BvdGxpZ2h0IC5wbGF5ZXItdG9wIC5wbGF5ZXItbmFtZSwgLnBsYXllci1zcG90bGlnaHQgLnBsYXllci1uYW1lLXdyYXAsIC5wbGF5ZXItc3BvdGxpZ2h0IC5oZWFkc2hvdCwgLnBsYXllci1zcG90bGlnaHQgLmluZm8sIC5wbGF5ZXItc3BvdGxpZ2h0IC5zaWxvLCAucGxheWVyLXNwb3RsaWdodCAuYXZlcmFnZXMsIC5wbGF5ZXItc3BvdGxpZ2h0IC5wbGF5ZXItbnVtYmVyJykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24tMScpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgalF1ZXJ5KCcuYmxvY2std3JhcC5wbGF5ZXItc3BvdGxpZ2h0IC5wbGF5ZXItYm94JykucmVtb3ZlKCk7XG4gICAgICAgIH0sIDE1MDAwKTtcbiAgICAgICAgaWYgKHBsYXllclNwb3RsaWdodENvdW50ZXIgPCAxNikge1xuICAgICAgICAgICAgcGxheWVyU3BvdGxpZ2h0Q291bnRlcisrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGxheWVyU3BvdGxpZ2h0Q291bnRlciA9IDA7XG4gICAgICAgIH1cbiAgICB9LCA2MDAwKTtcbiAgICAvKiA5IC0gU1BPVExJR0hUIFNMSURFIE9VVCAqL1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSgnLnBsYXllci1zcG90bGlnaHQgLmJvdHRvbS13cmFwLCAucGxheWVyLXNwb3RsaWdodCAudG9wLXdyYXAnKS5hZGRDbGFzcygndHJhbnNpdGlvbi0yJyk7XG4gICAgfSwgNDAwMDApO1xuICAgIC8qIDEwIC0gRE9ORS4gUkVNT1ZFICovXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KCcgLnBsYXllci1zcG90bGlnaHQgLmFwcGVuZGVkJykucmVtb3ZlKCk7XG4gICAgICAgIGpRdWVyeSgnIC5wbGF5ZXItc3BvdGxpZ2h0IC5zZWxlY3RlZCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGpRdWVyeSgnLnJpZ2h0LXdyYXAgLnRyYW5zaXRpb24tJyArIGkpLnJlbW92ZUNsYXNzKCd0cmFuc2l0aW9uLScgKyBpKTtcbiAgICAgICAgfVxuICAgIH0sIDQ1MDAwKTtcbn1cblxuZnVuY3Rpb24gbGVhZGVycyhnaWQsIGdhbWVTdGFydGVkKSB7XG4gICAgalF1ZXJ5KCcubGVhZGVycycpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB2YXIgZ2FtZURldGFpbCA9ICcnO1xuICAgIHZhciBkZXRhaWxBdmFpbGFibGUgPSBmYWxzZTtcbiAgICB2YXIgbGVhZGVyc1RpdGxlID0gJ1NFQVNPTiBMRUFERVJTJztcbiAgICBpZiAoY2hlY2tHYW1lU3RhdHVzKCkpIHtcbiAgICAgICAgbGVhZGVyc1RpdGxlID0gJ0dBTUUgTEVBREVSUyc7XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIHVybDogZmVlZHMuZ2FtZWRldGFpbChnaWQpLFxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciB0ZWFtTGluZVNjb3JlID0gW1wiaGxzXCIsIFwidmxzXCJdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgdGVhbUxpbmVTY29yZS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdHMgPSBkYXRhLmdbdGVhbUxpbmVTY29yZVt4XV07XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZWFtID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0cy50YSA9PT0gJ0JPUycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlYW0gPSAnY2VsdGljcyc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWFtID0gJ2F3YXknO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHN0YXQgaW4gcm9zdGVyT2JqW3RlYW1dLmxlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvc3Rlck9ialt0ZWFtXS5sZWFkZXJzW3N0YXRdID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsnLS0nLCAnLS0nLCAwLCAnLS0nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbJy0tJywgJy0tJywgMCwgJy0tJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWyctLScsICctLScsIDAsICctLSddXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHAgPSAwOyBwIDwgc3RhdHMucHN0c2cubGVuZ3RoOyBwKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHN0YXQgaW4gcm9zdGVyT2JqW3RlYW1dLmxlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3N0ZXJPYmpbdGVhbV0ubGVhZGVyc1tzdGF0XS5wdXNoKFtzdGF0cy5wc3RzZ1twXS5mbi50b1VwcGVyQ2FzZSgpLCBzdGF0cy5wc3RzZ1twXS5sbi50b1VwcGVyQ2FzZSgpLCBzdGF0cy5wc3RzZ1twXVtzdGF0XSwgc3RhdHMucHN0c2dbcF0ucGlkXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByb3N0ZXJPYmpbdGVhbV0ubGVhZGVyc1tzdGF0XS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYVsyXSAtIGJbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0ZWFtIGluIHJvc3Rlck9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgc3RhdCBpbiByb3N0ZXJPYmpbdGVhbV0ubGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvc3Rlck9ialt0ZWFtXS5sZWFkZXJzW3N0YXRdLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYlsyXSAtIGFbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NPUlRFRDonKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocm9zdGVyT2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBqUXVlcnkoJy5sZWFkZXJzLXRpdGxlJykuaHRtbChsZWFkZXJzVGl0bGUpO1xuICAgIGZvciAodmFyIHRlYW0gaW4gcm9zdGVyT2JqKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBzdGF0IGluIHJvc3Rlck9ialt0ZWFtXS5sZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgLy8gTEVBREVSIFNUQVQgVkFMVUVcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5sZWFkZXItc2VjdGlvbjpudGgtb2YtdHlwZSgnICsgKGkgKyAyKSArICcpIC4nICsgc3RhdCArICcuJyArIHRlYW0gKyAnIC5zdGF0JykuaHRtbCgnPHNwYW4gY2xhc3M9XCJhcHBlbmRlZCAnICsgcm9zdGVyT2JqW3RlYW1dLnRhICsgJ1wiPicgKyByb3N0ZXJPYmpbdGVhbV0ubGVhZGVyc1tzdGF0XVtpXVsyXSArICc8L3NwYW4+ICcgKyBzdGF0LnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIC8vIExFQURFUiBOQU1FXG4gICAgICAgICAgICAgICAgaWYgKHJvc3Rlck9ialt0ZWFtXS5sZWFkZXJzW3N0YXRdW2ldWzBdLmxlbmd0aCArIHJvc3Rlck9ialt0ZWFtXS5sZWFkZXJzW3N0YXRdW2ldWzFdLmxlbmd0aCA+PSAxNCkge1xuICAgICAgICAgICAgICAgICAgICByb3N0ZXJPYmpbdGVhbV0ubGVhZGVyc1tzdGF0XVtpXVswXSA9IHJvc3Rlck9ialt0ZWFtXS5sZWFkZXJzW3N0YXRdW2ldWzBdLnN1YnN0cigwLCAxKSArICcuJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcubGVhZGVyLXNlY3Rpb246bnRoLW9mLXR5cGUoJyArIChpICsgMikgKyAnKSAuJyArIHN0YXQgKyAnLicgKyB0ZWFtICsgJyAubmFtZScpLmh0bWwoJzxzcGFuIGNsYXNzPVwiYXBwZW5kZWRcIj4nICsgcm9zdGVyT2JqW3RlYW1dLmxlYWRlcnNbc3RhdF1baV1bMF0gKyAnPC9zcGFuPiAnICsgcm9zdGVyT2JqW3RlYW1dLmxlYWRlcnNbc3RhdF1baV1bMV0pO1xuICAgICAgICAgICAgICAgIC8vIExFQURFUiBIRUFEU0hPVFxuICAgICAgICAgICAgICAgIGpRdWVyeSgnLmxlYWRlci1zZWN0aW9uOm50aC1vZi10eXBlKCcgKyAoaSArIDIpICsgJykgLicgKyBzdGF0ICsgJy4nICsgdGVhbSArICcgLmhlYWRzaG90JykuYXR0cignc3JjJywgJ2h0dHBzOi8vYWstc3RhdGljLmNtcy5uYmEuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy9oZWFkc2hvdHMvbmJhL2xhdGVzdC8xMDQweDc2MC8nICsgcm9zdGVyT2JqW3RlYW1dLmxlYWRlcnNbc3RhdF1baV1bM10gKyAnLnBuZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSgnLmxlYWRlcnMsIC5sZWFkZXJzIC5ibG9jay1pbm5lcicpLmFkZENsYXNzKCd0cmFuc2l0aW9uLTEnKTtcbiAgICB9LCAxMDApO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSgnLmxlYWRlcnMgLmxlYWRlci1zZWN0aW9uJykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24tMScpO1xuICAgICAgICBqUXVlcnkoJy5sZWFkZXItc3Vic2VjdGlvbi5ib3R0b20gcDpudGgtb2YtdHlwZSgxKScpLmFkZENsYXNzKCd0cmFuc2l0aW9uLTEnKTtcbiAgICAgICAgalF1ZXJ5KCcubGVhZGVycyAubGVhZGVyLXNlY3Rpb24gLnVuZGVybGluZSwgLmxlYWRlcnMgLmxlYWRlci1zdWJzZWN0aW9uLnRvcCcpLmFkZENsYXNzKHJvc3Rlck9iai5jZWx0aWNzLnRhICsgJy1iZycpO1xuICAgIH0sIDExMDApO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSgnLmxlYWRlcnMgLmxlYWRlci1zZWN0aW9uJykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24tMicpO1xuICAgICAgICBqUXVlcnkoJy5sZWFkZXJzIC5ibG9jay1pbm5lcicpLmFkZENsYXNzKCd0cmFuc2l0aW9uLTInKTtcbiAgICB9LCAyMTAwKTtcbiAgICB2YXIgdHJhbnNpdGlvbkNvdW50ZXIgPSAxO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKG51bWJlclN0cmluZykge1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnLmxlYWRlcnMgLmxlYWRlci1zZWN0aW9uIC5sZWFkZXItc3RhdC13cmFwJykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24tJyArIGkpO1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnLmxlYWRlcnMgLmxlYWRlci1zZWN0aW9uIC51bmRlcmxpbmUsIC5sZWFkZXJzIC5sZWFkZXItc3Vic2VjdGlvbi50b3AnKS5yZW1vdmVDbGFzcyhyb3N0ZXJPYmouY2VsdGljcy50YSArICctYmcnKTtcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5sZWFkZXJzIC5sZWFkZXItc2VjdGlvbiAudW5kZXJsaW5lLCAubGVhZGVycyAubGVhZGVyLXN1YnNlY3Rpb24udG9wJykuYWRkQ2xhc3Mocm9zdGVyT2JqLmF3YXkudGEgKyAnLWJnJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zaXRpb25Db3VudGVyICUgMiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJy5sZWFkZXJzIC5sZWFkZXItc2VjdGlvbiAudW5kZXJsaW5lLCAubGVhZGVycyAubGVhZGVyLXN1YnNlY3Rpb24udG9wJykucmVtb3ZlQ2xhc3Mocm9zdGVyT2JqLmF3YXkudGEgKyAnLWJnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJy5sZWFkZXJzIC5sZWFkZXItc2VjdGlvbiAudW5kZXJsaW5lLCAubGVhZGVycyAubGVhZGVyLXN1YnNlY3Rpb24udG9wJykuYWRkQ2xhc3Mocm9zdGVyT2JqLmNlbHRpY3MudGEgKyAnLWJnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJy5sZWFkZXItc3Vic2VjdGlvbi5ib3R0b20gcCcpLnJlbW92ZUNsYXNzKCd0cmFuc2l0aW9uLTEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnLmxlYWRlcnMgLmxlYWRlci1zZWN0aW9uIC51bmRlcmxpbmUnKS5hZGRDbGFzcygndHJhbnNpdGlvbi0nICsgKGkgLyAyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJy5sZWFkZXItc3Vic2VjdGlvbi5ib3R0b20gcDpudGgtb2YtdHlwZSgnICsgKGkgLSAoaSAvIDIpICsgMSkgKyAnKScpLmFkZENsYXNzKCd0cmFuc2l0aW9uLTEnKTsgLy8gbG9sXG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25Db3VudGVyKys7XG4gICAgICAgICAgICB9LCA3MDAwICogaSk7XG4gICAgICAgIH1cbiAgICB9LCAyMTAwKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJy5sZWFkZXJzIC5sZWFkZXItc2VjdGlvbiwgLmxlYWRlcnMgLmxlYWRlci1zdWJzZWN0aW9uJykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24tMycpO1xuICAgIH0sIDQ0MTAwKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJy5sZWFkZXJzJykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24tMicpO1xuICAgIH0sIDQ0MTAwKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJy5sZWFkZXJzIC5sZWFkZXItc2VjdGlvbiAudW5kZXJsaW5lLCAubGVhZGVycyAubGVhZGVyLXN1YnNlY3Rpb24udG9wJykucmVtb3ZlQ2xhc3Mocm9zdGVyT2JqLmF3YXkudGEgKyAnLWJnJyk7XG4gICAgICAgIGpRdWVyeSgnLmxlYWRlcnMgLmxlYWRlci1zZWN0aW9uIC51bmRlcmxpbmUsIC5sZWFkZXJzIC5sZWFkZXItc3Vic2VjdGlvbi50b3AnKS5hZGRDbGFzcyhyb3N0ZXJPYmouY2VsdGljcy50YSArICctYmcnKTtcbiAgICAgICAgalF1ZXJ5KCcubGVhZGVycycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgalF1ZXJ5KCcubGVhZGVycyAuYXBwZW5kZWQnKS5yZW1vdmUoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBqUXVlcnkoJy5sZWFkZXJzIC50cmFuc2l0aW9uLScgKyBpICsgJywgLmxlYWRlcnMudHJhbnNpdGlvbi0nICsgaSkucmVtb3ZlQ2xhc3MoJ3RyYW5zaXRpb24tJyArIGkpO1xuICAgICAgICB9XG4gICAgfSwgNDUwMDApO1xufTtcblxuZnVuY3Rpb24gc29jaWFsKCkge1xuICAgIGpRdWVyeSgnLnNvY2lhbCAudGV4dC13cmFwLCAuc29jaWFsIC51bmRlcmxpbmUnKS5yZW1vdmVDbGFzcygndHJhbnNpdGlvbi0xJyk7XG4gICAgalF1ZXJ5KCcuc29jaWFsJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSgnLnNvY2lhbCAudGV4dC13cmFwLCAuc29jaWFsIC51bmRlcmxpbmUnKS5hZGRDbGFzcygndHJhbnNpdGlvbi0xJyk7XG4gICAgfSwgMTUwMDApO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSgnLnNvY2lhbCAuYXBwZW5kZWQnKS5yZW1vdmUoKTtcbiAgICAgICAgalF1ZXJ5KCcuc29jaWFsIC5zZWxlY3RlZCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICBqUXVlcnkoJy5zb2NpYWwnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgfSwgMjAwMDApO1xufTtcbi8qZnVuY3Rpb24gbW9iaWxlQXBwSW5pdCgpIHtcbiAgICB2YXIgY291bnRlciA9IDE7XG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSgnLmFwcCAuYm90dG9tLXdyYXAgaW1nJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoJy5hcHAgLmZlYXR1cmUtbGlzdCBwJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoJy5hcHAgLmZlYXR1cmUtbGlzdCBwOm50aC1vZi10eXBlKCcgKyBjb3VudGVyICsgJyknKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSgnLmFwcCAuYm90dG9tLXdyYXAgaW1nOm50aC1vZi10eXBlKCcgKyBjb3VudGVyICsgJyknKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGlmIChjb3VudGVyID09IDUpIHtcbiAgICAgICAgICAgIGNvdW50ZXIgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICB9XG4gICAgfSwgMjAwMCk7XG59O1xuKi9cbmZ1bmN0aW9uIG1vYmlsZUFwcCgpIHtcbiAgICBqUXVlcnkoJy5hcHAgLmJsb2NrLWlubmVyJykucmVtb3ZlQ2xhc3MoJ3RyYW5zaXRpb24tMScpO1xuICAgIGpRdWVyeSgnLmFwcCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB2YXIgY291bnRlciA9IDE7XG4gICAgdmFyIHJvdGF0ZVNjcmVlbnMgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KCcuYXBwIC5ib3R0b20td3JhcCBpbWcnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSgnLmFwcCAuZmVhdHVyZS1saXN0IHAnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSgnLmFwcCAuZmVhdHVyZS1saXN0IHA6bnRoLW9mLXR5cGUoJyArIGNvdW50ZXIgKyAnKScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgalF1ZXJ5KCcuYXBwIC5ib3R0b20td3JhcCBpbWc6bnRoLW9mLXR5cGUoJyArIGNvdW50ZXIgKyAnKScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgaWYgKGNvdW50ZXIgPT0gNSkge1xuICAgICAgICAgICAgY291bnRlciA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIH1cbiAgICB9LCA0MDAwKTtcbiAgICByb3RhdGVTY3JlZW5zO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSgnLmFwcCAuYmxvY2staW5uZXInKS5hZGRDbGFzcygndHJhbnNpdGlvbi0xJyk7XG4gICAgfSwgMjQwMDApO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSgnLmFwcCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChyb3RhdGVTY3JlZW5zKTtcbiAgICB9LCAyNTAwMCk7XG59O1xuXG5mdW5jdGlvbiBhbGxTdGFyKCl7XG4gICAgalF1ZXJ5KCcuYWxsLXN0YXIgLmJsb2NrLWlubmVyJykucmVtb3ZlQ2xhc3MoJ3RyYW5zaXRpb24tMScpO1xuICAgIGpRdWVyeSgnLmFsbC1zdGFyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuLyogICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KCcuYWxsLXN0YXIgLmJsb2NrLWlubmVyJykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24tMScpO1xuICAgIH0sIDI0MDAwKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJy5hbGwtc3RhcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChyb3RhdGVTY3JlZW5zKTtcbiAgICB9LCAyNTAwMCk7Ki9cbn1cbi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG49ICAgICAgICAgICAgTEVGVCBXUkFQICAgICAgICAgICAgPVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbmZ1bmN0aW9uIGxlZnRXcmFwKCkge1xuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoalF1ZXJ5KCcubGVmdC13cmFwIC5zdGFuZGluZ3MnKS5oYXNDbGFzcygndHJhbnNpdGlvbi0xJykpIHtcbiAgICAgICAgICAgIGpRdWVyeSgnLmxlZnQtd3JhcCAuc3RhbmRpbmdzJykucmVtb3ZlQ2xhc3MoJ3RyYW5zaXRpb24tMScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgalF1ZXJ5KCcubGVmdC13cmFwIC5zdGFuZGluZ3MnKS5hZGRDbGFzcygndHJhbnNpdGlvbi0xJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGpRdWVyeSgnLmxlZnQtd3JhcCAuc2NvcmVzLWFuZC1sZWFkZXJzJykuaGFzQ2xhc3MoJ3RyYW5zaXRpb24tMScpKSB7XG4gICAgICAgICAgICBqUXVlcnkoJy5sZWZ0LXdyYXAgLnNjb3Jlcy1hbmQtbGVhZGVycycpLnJlbW92ZUNsYXNzKCd0cmFuc2l0aW9uLTEnKTtcbiAgICAgICAgICAgIHVwZGF0ZUxlYWd1ZVNjb3JlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgalF1ZXJ5KCcubGVmdC13cmFwIC5zY29yZXMtYW5kLWxlYWRlcnMnKS5hZGRDbGFzcygndHJhbnNpdGlvbi0xJyk7XG4gICAgICAgIH1cbiAgICB9LCA1MDAwMCk7XG59XG5cbmZ1bmN0aW9uIHN0YW5kaW5nc0luaXQoYXdheVRlYW0pIHtcbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgIHVybDogZmVlZHMuc3RhbmRpbmdzLFxuICAgICAgICBhc3luYzogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHN0YW5kaW5nc0RhdGEpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhbmRpbmdzRGF0YS5zdGEuY28ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHN0YW5kaW5nc0RhdGEuc3RhLmNvW2ldLmRpLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgc3RhbmRpbmdzRGF0YS5zdGEuY29baV0uZGlbeF0udC5sZW5ndGg7IHQrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbmZlcmVuY2VzID0gWycuZWFzdCcsICcud2VzdCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBsYWNlID0gc3RhbmRpbmdzRGF0YS5zdGEuY29baV0uZGlbeF0udFt0XS5zZWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VlZCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZVN0YXR1cyA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YW5kaW5nc0RhdGEuc3RhLmNvW2ldLmRpW3hdLnRbdF0uc2VlIDw9IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWVkID0gc3RhbmRpbmdzRGF0YS5zdGEuY29baV0uZGlbeF0udFt0XS5zZWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhbmRpbmdzRGF0YS5zdGEuY29baV0uZGlbeF0udFt0XS50YSA9PSAnQk9TJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVN0YXR1cyA9ICdhY3RpdmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YW5kaW5nc0RhdGEuc3RhLmNvW2ldLmRpW3hdLnRbdF0udGEgPT0gYXdheVRlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVTdGF0dXMgPSAnYWN0aXZlLWF3YXknO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvd0hUTUwgPSAnPGRpdiBjbGFzcz1cInBsYWNlXCI+JyArIHNlZWQgKyAnPC9kaXY+PGRpdiBjbGFzcz1cImxvZ28td3JhcFwiPjxpbWcgY2xhc3M9XCJsb2dvXCIgc3JjPWh0dHA6Ly9pLmNkbi50dXJuZXIuY29tL25iYS9uYmEvYXNzZXRzL2xvZ29zL3RlYW1zL3ByaW1hcnkvd2ViLycgKyBzdGFuZGluZ3NEYXRhLnN0YS5jb1tpXS5kaVt4XS50W3RdLnRhICsgJy5zdmc+PC9kaXY+PGRpdiBjbGFzcz1cInRlYW0gKyAnICsgc3RhbmRpbmdzRGF0YS5zdGEuY29baV0uZGlbeF0udFt0XS50YSArICdcIj4nICsgc3RhbmRpbmdzRGF0YS5zdGEuY29baV0uZGlbeF0udFt0XS50YSArICc8L2Rpdj48ZGl2IGNsYXNzPVwid2luc1wiPicgKyBzdGFuZGluZ3NEYXRhLnN0YS5jb1tpXS5kaVt4XS50W3RdLncgKyAnPC9kaXY+PGRpdiBjbGFzcz1cImxvc3Nlc1wiPicgKyBzdGFuZGluZ3NEYXRhLnN0YS5jb1tpXS5kaVt4XS50W3RdLmwgKyAnPC9kaXY+PGRpdiBjbGFzcz1cImdhbWVzLWJlaGluZFwiPicgKyBzdGFuZGluZ3NEYXRhLnN0YS5jb1tpXS5kaVt4XS50W3RdLmdiICsgJzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoY29uZmVyZW5jZXNbaV0gKyAnID4gZGl2Om50aC1jaGlsZCgnICsgKHBsYWNlICsgMSkgKyAnKScpLmh0bWwocm93SFRNTCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoY29uZmVyZW5jZXNbaV0gKyAnID4gZGl2Om50aC1jaGlsZCgnICsgKHBsYWNlICsgMSkgKyAnKScpLmFkZENsYXNzKGFjdGl2ZVN0YXR1cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNjb3Jlc0luaXQodG9kYXlzU2NvcmVzRGF0YSkge1xuICAgIHZhciBsaXZlU2NvcmVzID0gdG9kYXlzU2NvcmVzRGF0YS5ncy5nO1xuICAgIGlmIChsaXZlU2NvcmVzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgIHZhciBzZWFzb25UeXBlID0gJyc7XG4gICAgICAgIGlmIChsaXZlU2NvcmVzWzBdLmdpZC5zdWJzdHIoMCwgMykgPT0gJzAwMScpIHtcbiAgICAgICAgICAgIHNlYXNvblR5cGUgPSAncHJlJztcbiAgICAgICAgfSBlbHNlIGlmIChsaXZlU2NvcmVzWzBdLmdpZC5zdWJzdHIoMCwgMykgPT0gJzAwNCcpIHtcbiAgICAgICAgICAgIHNlYXNvblR5cGUgPSAncG9zdCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpdmVTY29yZXMubGVuZ3RoID4gMSB8fCAobGl2ZVNjb3Jlcy5sZW5ndGggPT0gMSAmJiBsaXZlU2NvcmVzWzBdLmgudGEgIT0gJ0JPUycpKSB7XG4gICAgICAgICAgICB2YXIgc3RhdHVzQ29kZXMgPSBbJzFzdCBRdHInLCAnMm5kIFF0cicsICczcmQgUXRyJywgJzR0aCBRdHInLCAnMXN0IE9UJywgJzJuZCBPVCcsICczcmQgT1QnLCAnNHRoIE9UJywgJzV0aCBPVCcsICc2dGggT1QnLCAnN3RoIE9UJywgJzh0aCBPVCcsICc5dGggT1QnLCAnMTB0aCBPVCddO1xuICAgICAgICAgICAgdmFyIHNjb3Jlc0hUTUwgPSAnJztcbiAgICAgICAgICAgIHZhciBhZGRlZCA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gbGl2ZVNjb3Jlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGlmIChsaXZlU2NvcmVzW2ldLmgudGEgIT09ICdCT1MnICYmIGkgPCAxMSkge1xuICAgICAgICAgICAgICAgICAgICBhZGRlZCsrO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdlNjb3JlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoU2NvcmUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZSZXN1bHQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhSZXN1bHQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzTGl2ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGl2ZVNjb3Jlc1tpXS5zdCAhPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2U2NvcmUgPSBsaXZlU2NvcmVzW2ldLnYucztcbiAgICAgICAgICAgICAgICAgICAgICAgIGhTY29yZSA9IGxpdmVTY29yZXNbaV0uaC5zO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNMaXZlID0gXCJsaXZlXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNUZXh0ID0gbGl2ZVNjb3Jlc1tpXS5zdHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXNDb2Rlcy5pbmRleE9mKGxpdmVTY29yZXNbaV0uc3R0KSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNUZXh0ID0gbGl2ZVNjb3Jlc1tpXS5zdHQgKyAnIC0gJyArIGxpdmVTY29yZXNbaV0uY2w7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpdmVTY29yZXNbaV0uc3QgPT0gMyAmJiB2U2NvcmUgPCBoU2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZSZXN1bHQgPSAnbG9zZXInO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxpdmVTY29yZXNbaV0uc3QgPT0gMyAmJiBoU2NvcmUgPCB2U2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhSZXN1bHQgPSAnbG9zZXInO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNjb3Jlc0hUTUwgKz0gJzxkaXYgY2xhc3M9XCJzY29yZS13cmFwXCI+PGRpdiBjbGFzcz1cInNjb3JlLXN0YXR1cyAnICsgaXNMaXZlICsgJ1wiPicgKyBzVGV4dC50b1VwcGVyQ2FzZSgpICsgJzwvZGl2PjxkaXYgY2xhc3M9XCInICsgbGl2ZVNjb3Jlc1tpXS52LnRhICsgJ1wiPjxpbWcgc3JjPVwiaHR0cDovL3N0YXRzLm5iYS5jb20vbWVkaWEvaW1nL3RlYW1zL2xvZ29zLycgKyBsaXZlU2NvcmVzW2ldLnYudGEudG9VcHBlckNhc2UoKSArICdfbG9nby5zdmdcIj4gJyArIGxpdmVTY29yZXNbaV0udi50Yy50b1VwcGVyQ2FzZSgpICsgJyAnICsgbGl2ZVNjb3Jlc1tpXS52LnRuLnRvVXBwZXJDYXNlKCkgKyAnIDxkaXYgY2xhc3M9XCJzY29yZS1udW0gJyArIHZSZXN1bHQgKyAnXCI+JyArIHZTY29yZSArICc8L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiJyArIGxpdmVTY29yZXNbaV0uaC50YSArICdcIj48aW1nIHNyYz1cImh0dHA6Ly9zdGF0cy5uYmEuY29tL21lZGlhL2ltZy90ZWFtcy9sb2dvcy8nICsgbGl2ZVNjb3Jlc1tpXS5oLnRhLnRvVXBwZXJDYXNlKCkgKyAnX2xvZ28uc3ZnXCI+ICcgKyBsaXZlU2NvcmVzW2ldLmgudGMudG9VcHBlckNhc2UoKSArICcgJyArIGxpdmVTY29yZXNbaV0uaC50bi50b1VwcGVyQ2FzZSgpICsgJyA8ZGl2IGNsYXNzPVwic2NvcmUtbnVtICcgKyBoUmVzdWx0ICsgJ1wiPicgKyBoU2NvcmUgKyAnPC9kaXY+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqUXVlcnkoJy5zY29yZXMnKS5lbXB0eSgpLmFwcGVuZChzY29yZXNIVE1MKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWRkZWQgPCA2KSB7XG4gICAgICAgICAgICBqUXVlcnkoJy5sZWFndWUtbGVhZGVycycpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGpRdWVyeSgnLmxlYWd1ZS1sZWFkZXJzJykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMZWFndWVTY29yZXMoKSB7XG4gICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICB1cmw6IGZlZWRzLnRvZGF5c1Njb3JlcyxcbiAgICAgICAgYXN5bmM6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBzY29yZXNJbml0KGRhdGEpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGxlYWd1ZUxlYWRlcnMoKSB7XG4gICAgdmFyIGxlYWd1ZUxlYWRlcnNIVE1MID0gJzxkaXYgY2xhc3M9XCJ0aXRsZVwiPjxwPkxFQUdVRSBMRUFERVJTPC9wPjxwPlBUUzwvcD48cD5SRUI8L3A+PHA+QVNUPC9wPjxwPlNUTDwvcD48cD5CTEs8L3A+PC9kaXY+JztcbiAgICB2YXIgc3RhdFR5cGUgPSAnJztcbiAgICB2YXIgZGF0YUluZGV4ID0gW1wiUkFOS1wiLCBcIlBMQVlFUl9JRFwiLCBcIlBMQVlFUlwiLCBcIlRFQU1fSURcIiwgXCJURUFNX0FCQlJFVklBVElPTlwiXTtcbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgIHVybDogZmVlZHMubGVhZ3VlTGVhZGVycyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgIGFzeW5jOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFyIGxlYWRlcnNEYXRhID0gZGF0YS5yZXN1bHRTZXRzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWFkZXJzRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGNyZWF0ZUluZGV4KGRhdGFJbmRleCwgbGVhZGVyc0RhdGFbaV0uaGVhZGVycyk7XG4gICAgICAgICAgICAgICAgdmFyIHJvd3MgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoW1wiUFRTXCIsIFwiUkVCXCIsIFwiQVNUXCIsIFwiU1RMXCIsIFwiQkxLXCJdLmluZGV4T2YobGVhZGVyc0RhdGFbaV0uaGVhZGVyc1s4XSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgbGVhZGVyc0RhdGFbaV0ucm93U2V0Lmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IGxlYWRlcnNEYXRhW2ldLnJvd1NldFt4XVsyXS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gblswXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxuID0gblsxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93cyArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsZWZ0XCI+PGRpdiBjbGFzcz1cInBsYWNlXCI+JyArIGxlYWRlcnNEYXRhW2ldLnJvd1NldFt4XVswXSArICc8L2Rpdj48ZGl2IGNsYXNzPVwibG9nby13cmFwXCI+PGltZyBjbGFzcz1cImxvZ29cIiBzcmM9XCJodHRwOi8vc3RhdHMubmJhLmNvbS9tZWRpYS9pbWcvdGVhbXMvbG9nb3MvJyArIGxlYWRlcnNEYXRhW2ldLnJvd1NldFt4XVs0XSArICdfbG9nby5zdmdcIi8+PC9kaXY+PGRpdiBjbGFzcz1cIm5hbWVcIj48c3Bhbj4nICsgZm4gKyAnPC9zcGFuPiAnICsgbG4gKyAnPC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInJpZ2h0XCI+PGRpdiBjbGFzcz1cInZhbHVlXCI+JyArIHJvdW5kKGxlYWRlcnNEYXRhW2ldLnJvd1NldFt4XVs4XSkgKyAnPC9kaXY+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZWFndWVMZWFkZXJzSFRNTCArPSAnPGRpdiBjbGFzcz1cImxlYWd1ZS1sZWFkZXJzLXdyYXBcIj4nICsgcm93cyArICc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpRdWVyeSgnLmxlYWd1ZS1sZWFkZXJzJykuZW1wdHkoKS5hcHBlbmQobGVhZ3VlTGVhZGVyc0hUTUwpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdmFyIGNvdW50ZXIgPSAyO1xuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJy5sZWFndWUtbGVhZGVycy13cmFwLCAubGVhZ3VlLWxlYWRlcnMgLnRpdGxlIHAnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeSgnLmxlYWd1ZS1sZWFkZXJzLXdyYXA6bnRoLW9mLXR5cGUoJyArIGNvdW50ZXIgKyAnKSwgLmxlYWd1ZS1sZWFkZXJzIC50aXRsZSBwOm50aC1vZi10eXBlKCcgKyBjb3VudGVyICsgJyknKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGlmIChjb3VudGVyID09IDYpIHtcbiAgICAgICAgICAgIGNvdW50ZXIgPSAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICB9XG4gICAgfSwgMTAwMDApO1xufSJdfQ==

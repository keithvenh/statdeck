DROP VIEW IF EXISTS "standings_v" CASCADE;
CREATE OR REPLACE VIEW "standings_v" AS
SELECT
  ts.team_season_id,
  ts.league_season_id,
  ts.team_name,
  ts.team_abbr,
  SUM(CASE WHEN gt.runs > opp.runs THEN 1 ELSE 0 END) AS wins,
  SUM(CASE WHEN gt.runs < opp.runs THEN 1 ELSE 0 END) AS losses,
  ts.division_id,
  d.abbr AS division_abbr,
  d.name_short AS division_name_short,
  d.name_long AS division_name_long,
  c.conference_id,
  c.abbr AS conference_abbr,
  c.name_short AS conference_name_short,
  c.name_long AS conference_name_long
FROM "Game" g
JOIN "GameTeam" gt ON gt.game_id = g.game_id
JOIN "GameTeam" opp ON opp.game_id = g.game_id AND opp.is_home <> gt.is_home
JOIN "TeamSeason" ts ON ts.team_season_id = gt.team_season_id
JOIN "Division" d ON d.division_id = ts.division_id
JOIN "Conference" c ON c.conference_id = d.conference_id
WHERE g.status = 'final' GROUP BY ts.team_season_id, ts.league_season_id, ts.team_name, ts.team_abbr, ts.division_id, d.abbr, d.name_short, c.conference_id, c.abbr, c.name_short, d.name_long, c.name_long;
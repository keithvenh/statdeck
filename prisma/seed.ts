enum GameStatus {
  scheduled
  in_progress
  final
  postponed
  suspended
}

model Game {
  game_id           Int @id @default(autoincrement())
  league_season_id  Int
  game_number       Int
  game_set          Int
  status            GameStatus @default(scheduled)

  game_teams        GameTeam[]

  league_season     LeagueSeason @relation(fields: [league_season_id], references: [league_season_id], onDelete: Cascade)

  @@unique([league_season_id, status, game_number])
  @@index([league_season_id, game_set])
}

model GameTeam {
  game_team_id      Int @id @default(autoincrement())
  game_id           Int
  team_season_id    Int
  is_home           Boolean
  runs              Int?
  hits              Int?
  errors            Int?

  game              Game @relation(fields: [game_id], references: [game_id], onDelete: Cascade)
  team              TeamSeason @relation(fields: [team_season_id], references: [team_season_id], onDelete: Cascade)

  @@unique([game_id, team_season_id])
  @@unique([game_id, is_home])
  @@index([team_season_id])
}

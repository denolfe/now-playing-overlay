#NoEnv
#Singleinstance force
#Persistent
SetTitleMatchMode, 2
SendMode Input
SetWorkingDir %A_ScriptDir%
SetTitleMatchMode, 2

file := "public/NowPlaying.txt"
was_playing := ""

SetTimer, CheckSong, 1000
Return 

CheckSong:

	WinGetTitle, playing, ahk_class SpotifyMainWindow
	StringTrimLeft, playing, playing, 10
	if (was_playing != playing)
	{
		;Traytip, Song Changed, % playing, 1
		was_playing := playing
		playing_formatted := playing
		FileDelete, % file
		FileAppend, % playing_formatted, % file, UTF-8
	}
	Return
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
		if (playing == "")
		{
			Menu, Tray, Tip, No Song Playing
			HttpQueryInfo("http://localhost:1337/np/nosong")
		}
		else
		{
			Menu, Tray, Tip, % playing
			HttpQueryInfo("http://localhost:1337/np/" playing)
		}
		was_playing := playing
	}
	Return
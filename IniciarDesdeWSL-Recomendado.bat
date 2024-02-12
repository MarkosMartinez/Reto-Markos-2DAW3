@echo off
IF NOT EXIST IniciarDesdeLinux.sh (
    powershell -Command "(New-Object System.Net.WebClient).DownloadFile('https://github.com/MarkosMartinez/Reto-Markos-2DAW3/releases/latest/download/IniciarDesdeLinux.sh', 'IniciarDesdeLinux.sh')"
)
wsl bash -c "sed -i 's/\r$//' IniciarDesdeLinux.sh && bash IniciarDesdeLinux.sh"
pause
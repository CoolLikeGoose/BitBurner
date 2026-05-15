.PHONY: clean-all clean-common clean-shared clean-tool clean-ui clean-manager

all: clean-all
	@echo Code wiped

clean-all: clean-common clean-shared clean-tool clean-ui clean-manager clean-hacknet clean-test clean-txt clean-data clean-managers
	@echo All cleaned

clean-common:
	@powershell -Command "if (Test-Path common) { Remove-Item -Recurse -Force common; Write-Output 'Removed common' }"

clean-shared:
	@powershell -Command "if (Test-Path shared) { Remove-Item -Recurse -Force shared; Write-Output 'Removed shared' }"

clean-tool:
	@powershell -Command "if (Test-Path tool) { Remove-Item -Recurse -Force tool; Write-Output 'Removed tool' }"

clean-ui:
	@powershell -Command "if (Test-Path UI) { Remove-Item -Recurse -Force UI; Write-Output 'Removed UI' }"

clean-data:
	@powershell -Command "if (Test-Path data) { Remove-Item -Recurse -Force data; Write-Output 'Removed data' }"

clean-managers:
	@powershell -Command "if (Test-Path managers) { Remove-Item -Recurse -Force managers; Write-Output 'Removed managers' }"

# files
clean-manager:
	@powershell -Command "if (Test-Path manager.js) { Remove-Item -Force manager.js; Write-Output 'Removed manager.js' }"

clean-hacknet:
	@powershell -Command "if (Test-Path hack-net-auto.js) { Remove-Item -Force hack-net-auto.js; Write-Output 'Removed hack-net-auto.js' }"

clean-test:
	@powershell -Command "if (Test-Path test.tsx) { Remove-Item -Force test.tsx; Write-Output 'Removed test.tsx' }"

clean-txt:
	@powershell -Command "if (Test-Path APIBreakInfo-3.0.0.txt) { Remove-Item -Force APIBreakInfo-3.0.0.txt; Write-Output 'Removed APIBreakInfo-3.0.0.txt' }"

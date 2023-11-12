scafold:
	npx sequelize-auto -o "./src/models" -d db_timesheet -h localhost -p 3306 -u root -x admin -e mysql

.PHONY : scafold
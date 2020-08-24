
import psycopg2
import datetime


conn = psycopg2.connect(database="jsrush",
                                user="naruto",
                                password="naruto",
                                host="localhost",
                                port="5432")

cursor = conn.cursor()

cursor.execute("""SELECT table_name FROM information_schema.tables
       WHERE table_schema = 'public'""")

tables = [
    'Statuses',
    'Clans',
    'Users',
    'Courses',
    'Sections',
    'SectionPrerequisites',
    'UserLevels',
    'Levels',
    'Comments',
    'Friends',
    'CommentTypes',
    'Lessons',
    'UserCourses',
    'Tasks',
    'Comments',
    'UserTasks',
    'LastLessons',
    'LastTasks',
    'LastActivities',
    'Replies',
    'Likes',
    'Help',
    'Feedbacks'
]

# for table in cursor.fetchall():
#     tables.append(list(table)[0])
#
# tables.remove('SequelizeMeta')


fileName = datetime.datetime.now().strftime("%Y-%m-%d--%H-%M-%S") + '.sql'
file = open(fileName, 'a')






def getColumnNames(tableName):
    sql = 'SELECT * FROM "' + tableName + '"'
    cursor.execute(sql)
    colnames = [desc[0] for desc in cursor.description]
    return colnames

def getTableData(tableName):
    sql = 'SELECT * FROM "' + tableName + '"'
    data = cursor.fetchall()

    convertedData = []
    for row in data:
        convertedData.append(list(row))

    data = convertedData

    return data


def makeInsertCommands(tableName, colnames, data):

    strColNames = convertColNamesToString(colnames)

    getAllSql = 'SELECT * FROM "' + tableName + '"'



    sql = 'INSERT INTO "' + tableName +  '"' + strColNames + ' VALUES\n'

    for row in data:
        sql += '\t'
        sql += convertDataRowsToString(row)
        sql += ",\n"

    sql = sql[0:len(sql)-2]
    sql += ';\n'

    sql += 'ALTER SEQUENCE "' + tableName + '_id_seq" RESTART WITH ' + str(data[len(data)-1][0] + 1) + ';\n\n'

    return sql


def convertColNamesToString(colnames):
    result = "("

    for colName in colnames:
        result += '"' + \
                  str(colName) + \
                  '", '

    result = result[0:len(result)-2]

    result += ")"

    return result

def convertDataRowsToString(dataRow):
    result = "("

    for value in dataRow:
        if value is None:
            value = 'null'
        if (isinstance(value, str) or isinstance(value, datetime.datetime)) and value != 'null':
            result += "'"

        result += str(value)

        if (isinstance(value, str) or isinstance(value, datetime.datetime)) and value != 'null':
            result += "', "

        else:
            result += ", "

    result = result[0:len(result) - 2]

    result += ")"


    return result


def removeColIds(colnames):
    return colnames[1:len(colnames)]

def removeDataIds(data):
    output = []

    for row in data:
        output.append(row[1:len(row)])

    return output


for tableName in tables:
    columnNames = getColumnNames(tableName)

    data = getTableData(tableName)

    if(len(data)):
        insertForCurrentTable = makeInsertCommands(tableName, columnNames, data)
        file.write(insertForCurrentTable)



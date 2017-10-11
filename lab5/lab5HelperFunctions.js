/////// HELPER FUNCTIONS  ////////////////////////////////////
function updateDataAndRange(data,projectList){
    //calculate and add salary for each employee 
    //calcualte Departmean and store in meansByDept
    //calculate and add overunder for each employee
    //calcualte salaryRange, overunderRange and salaryCompRange and store them in global variables.     
    calculateSalary(data,projectList)
    meansByDept=findDeptMean(data)
    addingOverunder(data)
    overunderRange=findMinMaxRange(data,"overunder")
    salaryRange=findMinMaxRange(data,"salary")
    salaryCompRange=findSalaryCompRange(data,projectList)
}

function calculateSalary(data,projectsList) {
//input a data and a list of project
//calculate the sum salary of all projects in the projectsList, and store it in the data under a field called “salary” 
  
  for (idx in data) {  // for every employee
    employee = data[idx];  // grab the employee
    // calculate their salary as a total of all project
    var salary=0
    for (p of projectsList){
        salary+=employee[p]
    }
    data[idx].salary = salary
  }
  return data
}

  
function findDeptMean(data){
    //calculate mean salary of each department 
//return a dictionary of department means. 
 
    meansByDept={}
    // console.log(data)
    for (d of data){//find all unique departments 
        
        meansByDept[d.dept]=undefined //temporarly set to undefined 
    };
    for (key in meansByDept){
        //using d3 helper function to get mean 
        meanValue=d3.mean(data,function(d){
        if(d['dept']==key){
            return d.salary 
        }
        })
        meansByDept[key]=meanValue
    }
    return meansByDept
}

/// helper function to calculate over under
function addingOverunder(data){
    //calculate and add overunder information to the data
    for (d of data){
        d["overunder"]=d.salary-meansByDept[d.dept]
    }
}

function findMinMaxRange(data,fieldName){
    var minValue=d3.min(data,function(d,i){
        return d[fieldName]
    })
    var maxValue=d3.max(data,function(d,i){
        return d[fieldName]
    })
    return ({"min":minValue,"max":maxValue})
}


function findSalaryCompRange(data,projectList){
    var salaryCompRange={min:Number.POSITIVE_INFINITY, max:Number.NEGATIVE_INFINITY}
    for (project of projectList){
        var minMaxDict=findMinMaxRange(data,project)
        if(minMaxDict.min<salaryCompRange.min){
            salaryCompRange.min=minMaxDict.min
        }
        if(minMaxDict.max>salaryCompRange.max){
            salaryCompRange.max=minMaxDict.max
        }
    }
    return salaryCompRange
}


var stateCoordinates={'Hawaii': {'index': 'NA', 'Points': ['-157.524452', '21.146768']}, 'Ohio': {'index': 'NA', 'Points': ['-82.749366', '40.480854']}, 'New York': {'index': 'NA', 'Points': ['-74.645228', '41.507548']}, 'Illinois': {'index': 'NA', 'Points': ['-88.380238', '41.278216']}, 'Louisiana': {'index': 'NA', 'Points': ['-91.457133', '30.69927']}, 'Minnesota': {'index': 'NA', 'Points': ['-93.583003', '45.210782']}, 'Colorado': {'index': 'NA', 'Points': ['-105.203628', '39.500656']}, 'Puerto Rico': {'index': 'NA', 'Points': ['-66.58765', '18.19958']}, 'Rhode Island': {'index': 'NA', 'Points': ['-71.448902', '41.753318']}, 'Idaho': {'index': 'NA', 'Points': ['-115.133222', '44.242605']}, 'South Dakota': {'index': 'NA', 'Points': ['-99.043799', '44.047502']}, 'Massachusetts': {'index': 'NA', 'Points': ['-71.363628', '42.271831']}, 'Tennessee': {'index': 'NA', 'Points': ['-86.397772', '35.795862']}, 'Kansas': {'index': 'NA', 'Points': ['-96.536052', '38.454303']}, 'Nevada': {'index': 'NA', 'Points': ['-116.304648', '37.165965']}, 'Florida': {'index': 'NA', 'Points': ['-81.634622', '27.79585']}, 'New Hampshire': {'index': 'NA', 'Points': ['-71.463342', '43.153046']}, 'Mississippi': {'index': 'NA', 'Points': ['-89.593164', '32.56642']}, 'Delaware': {'index': 'NA', 'Points': ['-75.561908', '39.397164']}, 'New Jersey': {'index': 'NA', 'Points': ['-74.428055', '40.438458']}, 'Iowa': {'index': 'NA', 'Points': ['-93.049161', '41.960392']}, 'California': {'index': 'NA', 'Points': ['-119.355165', '35.458606']}, 'Wyoming': {'index': 'NA', 'Points': ['-107.008835', '42.675762']}, 'Kentucky': {'index': 'NA', 'Points': ['-85.241819', '37.808159']}, 'Virginia': {'index': 'NA', 'Points': ['-77.835857', '37.750345']}, 'Alaska': {'index': 'NA', 'Points': ['-148.716968', '61.288254']}, 'Indiana': {'index': 'NA', 'Points': ['-86.261515', '40.163935']}, 'South Carolina': {'index': 'NA', 'Points': ['-81.032387', '34.034551']}, 'Utah': {'index': 'NA', 'Points': ['-111.90016', '40.438987']}, 'North Dakota': {'index': 'NA', 'Points': ['-99.334736', '47.375168']}, 'West Virginia': {'index': 'NA', 'Points': ['-80.820221', '38.767195']}, 'Maine': {'index': 'NA', 'Points': ['-69.719931', '44.313614']}, 'Washington': {'index': 'NA', 'Points': ['-121.624501', '47.341728']}, 'Arkansas': {'index': 'NA', 'Points': ['-92.576816', '35.080251']}, 'Connecticut': {'index': 'NA', 'Points': ['-72.874365', '41.494852']}, 'Montana': {'index': 'NA', 'Points': ['-111.209708', '46.813302']}, 'Alabama': {'index': 'NA', 'Points': ['-86.766233', '33.001471']}, 'New Mexico': {'index': 'NA', 'Points': ['-106.342108', '34.623012']}, 'Arizona': {'index': 'NA', 'Points': ['-111.828711', '33.373506']}, 'Michigan': {'index': 'NA', 'Points': ['-84.170753', '42.866412']}, 'Nebraska': {'index': 'NA', 'Points': ['-97.403875', '41.183753']}, 'Texas': {'index': 'NA', 'Points': ['-97.388631', '30.943149']}, 'District of Columbia': {'index': 'NA', 'Points': ['-77.014001', '38.910092']}, 'Oklahoma': {'index': 'NA', 'Points': ['-96.834653', '35.59794']}, 'Missouri': {'index': 'NA', 'Points': ['-92.15377', '38.437715']}, 'Maryland': {'index': 'NA', 'Points': ['-76.797396', '39.145653']}, 'Wisconsin': {'index': 'NA', 'Points': ['-89.001006', '43.728544']}, 'Vermont': {'index': 'NA', 'Points': ['-72.814309', '44.081127']}, 'Oregon': {'index': 'NA', 'Points': ['-122.579524', '44.732273']}, 'Georgia': {'index': 'NA', 'Points': ['-83.868887', '33.332208']}, 'Pennsylvania': {'index': 'NA', 'Points': ['-77.075925', '40.463528']}, 'North Carolina': {'index': 'NA', 'Points': ['-79.667654', '35.553334']}}
function findTotalSalaryRange(data){
    // return the totalSalary for employees in each states. 
    min=1000
    max=-1000
    sum=0
    for( d of data){
        
        v=d.properties.totalSalary
        sum+=v
        if (v>max){
             max=v
        }
        else if (v<min){
             min=v
        }
           
    }
    avg=sum/data.length
    return ({"min":min,"max":max,average:avg})
}
function createDataForEachState(data){
// organize the salaryData into data format required for map drawing
    // e.g.stateSalary={"type":"Feature","id":"36","geometry":{"type":"Point","coordinates":[-74.645228,41.507548]},"properties":{"name":"New York","totalSalary":18976457,"employees":[1,3,4]}},
    stateSalary={"type":"FeatureCollection","features":[]}

    for (i in data){
        employee=data[i]
        loc=employee["location"]
        // console.log(employee.name)
        
        coordinates=stateCoordinates[loc]["Points"]
        coordinates=[Number(coordinates[0]),Number(coordinates[1])]
        indexToStore=stateCoordinates[loc]["index"]
        // console.log(i,loc,coordinates,indexToStore)
        
        if(indexToStore!='NA'){
            stateSalary.features[indexToStore].properties.employees.push(i)
            stateSalary.features[indexToStore].properties.totalSalary+=(employee.salary)
        }
        else{
            
            newEntry={}
            newEntry.type="Feature"
            newEntry.geometry={type:"Point","coordinates":coordinates}
            
            newEntry.properties={name:loc,totalSalary:Number(employee.salary),employees:[i]}//
            // console.log(newEntry.properties.totalSalary)
            newEntry["id"]=String(stateSalary.features.length)
            stateSalary.features.push(newEntry)
            stateCoordinates[loc]["index"]=stateSalary.features.length-1
            
        }
  
    }

    return stateSalary
}

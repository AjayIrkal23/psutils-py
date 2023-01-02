import time
import psutil 
import math
import json
import requests
import platform
import wmi
import speedtest



wifi  = speedtest.Speedtest()
wifi.get_best_server()
# print("Architecture: " + platform.architecture()[0])

# # machine
# print("Machine: " + platform.machine())

# # node
# print("Node: " + platform.node())

# # system
# print("System: " + platform.system())

# print("System: " + platform.platform())
# print("System: " +  platform.uname())

c = wmi.WMI()

my_system = c.Win32_ComputerSystem()[0]


def Send_Usage(cpu_usage,mem_usage,path_usage,windows,sysDets,processer,ram,Manufacturer,model,name,numofprocess,systemtype,family,network):

    x = {}
    processes = []
  

    for proc in psutil.process_iter(['pid', 'name', 'username',"memory_percent"]):
        processes.append(proc.info)
    a = {}
    a["manufacturer"] = Manufacturer
    a['model']= model
    a['name']= name
    x['downloadSpeed']= wifi.download() / math.pow(1024, 2)
    x['uploadSpeed']= wifi.upload() / math.pow(1024, 2)
    a['numofprocess']= numofprocess
    a['systemtype']= systemtype
    a['family']= family
    x['cpu'] = cpu_usage
    x['type'] = windows
    x['systemProcess'] = processer
    x['ram'] = round(ram)
    x['systemdets'] = sysDets
    x['memory'] = mem_usage
    x['details'] = a
    x["networkDets"] = network
    # print(f'{path_usage} is cpu memory')

    temp = {}
    for i in path_usage:
        # print(psutil.disk_usage(i.device)[3]) 
        total = psutil.disk_usage(i.device)[0]
        total = total / math.pow(1024, 3)
  
        byte = psutil.disk_usage(i.device)[2]
        byte = byte / math.pow(1024, 3)
  
        temp[i.device] = round(total),round(byte)
    
   
    x['data'] = temp
    x['processes'] = processes
   
    

    return x




while True:
    x =  Send_Usage(psutil.cpu_percent(),psutil.virtual_memory().percent,psutil.disk_partitions(all=False),platform.system(),platform.processor(),platform.machine(),psutil.virtual_memory().total / math.pow(1024, 3),my_system.Manufacturer,my_system.Model,my_system.Name,my_system.NumberOfProcessors,my_system.SystemType,my_system.SystemFamily, psutil.net_if_addrs())
   
    r = requests.post('https://serverbackend-lz47.onrender.com/add',json=x)
    print(r.text)
    time.sleep(20)







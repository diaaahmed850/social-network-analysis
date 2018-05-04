from pymongo import MongoClient
import pprint
import networkx as nx
import matplotlib.pyplot as plt
import json
import sys
from networkx.algorithms import approximation as approx
client = MongoClient()
client = MongoClient('mongodb://m49dy:admin12345@ds251799.mlab.com:51799/sna_project')
db = client['sna_project']
userCollection = db['users']
array_users=list(userCollection.find())
#print(array_users)
G = nx.Graph()
for user in array_users:
	G.add_node(user["name"]) 

for user in array_users:
	for friend in user["friends"]:
		G.add_edge(user["name"],userCollection.find_one({"_id":friend})["name"],color='blue')
		


#G.add_node(array_users[0]["name"])
#G.add_node(array_users[1]["name"])
#G.add_edge(array_users[0]["name"],array_users[1]["name"])
#nx.draw(G, with_labels=True, font_weight='bold',node_color='black')

options = {
    'node_color': 'blue',
    'node_size': 100,
    'width': 3,
}
if len(sys.argv)>1:
     
    target = sys.argv[1]
    local_storage = json.load(open("localStorage/user", 'r'))
    print (local_storage["name"])
    '''
    for user in array_users:
        if user["name"] != local_storage["name"]:
            if approx.local_node_connectivity(G, local_storage["name"], user["name"]) != 0:
                for p in nx.all_shortest_paths(G, local_storage["name"], user["name"]):
                    print(p)
                    
    '''
    
    print(target)
    #edgeList = nx.all_shortest_paths(G, local_storage["name"], array_users[0]["name"])[0]
    for p in nx.all_shortest_paths(G, local_storage["name"], target):
        for x in range(0, len(list(p))-1):
            G.edges[p[x], p[x+1]]['color']='red'
        
         

     
    #nx.draw_random(G, **options)
    #plt.subplot(222)
edges = G.edges()
print(edges.data('color'))
colors = [G[u][v]['color'] for u, v in edges]
 
pos = nx.circular_layout(G)

nx.draw_circular(G,with_labels=True, font_weight='bold',node_color='red',node_shape=',',font_size=8,node_size=0,edge_color=colors)

plt.savefig("assets/graph.png")
#plt.show()


     

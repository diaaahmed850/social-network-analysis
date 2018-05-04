import plotly.plotly as py
import plotly.graph_objs as go
from pymongo import MongoClient
client = MongoClient()
client = MongoClient('mongodb://m49dy:admin12345@ds251799.mlab.com:51799/sna_project')
db = client['sna_project']
userCollection = db['users']
array_users = list(userCollection.find())
names=[]
no_of_friends=[]
no_of_posts=[]
for user in array_users:
    names.append(user["name"])
    no_of_friends.append(len(user["friends"]))
    no_of_posts.append(len(user["posts"]))

py.sign_in('DemoAccount', '2qdyfjyr7o') # Replace the username, and API key with your credentials.

trace = go.Bar(x=names, y= no_of_friends)
data = [trace]
 
layout=go.Layout(title = 'no of friends for each user', width = 800, height = 640,xaxis= dict(
        title='users',
        titlefont=dict(
            family='Courier New, monospace',
            size=18,
            color='#7f7f7f'
        )
    ),
    yaxis = dict(
        title='no of friends',
        titlefont=dict(
            family='Courier New, monospace',
            size=18,
            color='#7f7f7f'
        )
    )
)
fig = go.Figure(data=data, layout=layout)

py.image.save_as(fig, filename='assets/a-simple-plot.png')
trace = go.Bar(x=names, y=no_of_posts)
data = [trace]

layout = go.Layout(title='no of posts for each user', width=800, height=640, xaxis=dict(
    title='users',
    titlefont=dict(
        family='Courier New, monospace',
        size=18,
        color='#7f7f7f'
    )
),
    yaxis=dict(
        title='no of posts',
        titlefont=dict(
            family='Courier New, monospace',
            size=18,
            color='#7f7f7f'
        )
)
)
fig = go.Figure(data=data, layout=layout)

py.image.save_as(fig, filename='assets/posts.png')



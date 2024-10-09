'use client'

import { useRef, useEffect, useState, act } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, MessageCircle, Settings, LogOut, X, Send, ChevronLeft } from 'lucide-react'
import NavigationBarComponent from '@/components/navigation-bar'
import Filter from '@/components/filter'
import mapImage from '@/public/map.png'
import MapComponent from '@/components/map'
import avatar1 from '@/public/avatars/avatar1.png'
import avatar2 from '@/public/avatars/avatar2.png'
import avatar3 from '@/public/avatars/avatar3.png'

import UserShortInfoComponent from '@/components/user-short-info'
import UserInfo from '@/components/user-info'

type User = {
  id: number
  name: string
  x: number
  y: number
  type: 'user' | 'class'
  markerId: number
}

type ChatMessage = {
  id: number
  senderId: number
  text: string
  timestamp: Date
}

export default function DanceConnectComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [chatsOpen, setChatsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState<{ [key: number]: ChatMessage[] }>({})
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
  const [user, setUser] = useState<any | null>(null)
  const [fullsizeUser, setFullsizeUser] = useState(false)

  useEffect(() => {
    const mockUsers: User[] = [
      { id: 1, name: 'Aroan Grey', x: 50, y: 100, type: 'user', markerId: 345 },
      { id: 2, name: 'Charlotte de Groen', x: 150, y: 200, type: 'user', markerId: 42 },
      { id: 4, name: 'Alex de Witte', x: 200, y: 300, type: 'user', markerId: 132 },
    ]
    setUsers(mockUsers)

    const mockChats: { [key: number]: ChatMessage[] } = {
      1: [
        { id: 1, senderId: 1, text: "Hey! Want to dance?", timestamp: new Date(2023, 5, 1, 14, 30) },
        { id: 2, senderId: 0, text: "Where and when?", timestamp: new Date(2023, 5, 1, 14, 35) },
      ],
      2: [
        { id: 3, senderId: 2, text: "Hello! Are you free for a dance session?", timestamp: new Date(2023, 5, 2, 10, 0) },
      ],
    }
    setChats(mockChats)

    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const image = new Image();
    image.src = mapImage.src; // Replace with your image path
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let startX, startY;

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight - 64

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    image.onload = () => {
        drawImage();
    };

    function drawImage() {
        console.log(mapImage.width, mapImage.height, canvas.width, canvas.height, offsetX, offsetY)

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, offsetX, offsetY, image.width/2, image.height/2);

        users.forEach(user => {
          ctx.beginPath()
          ctx.arc(user.x, user.y, 20, 0, 2 * Math.PI)
          ctx.fillStyle = user.type === 'user' ? '#4CAF50' : '#2196F3'
          ctx.fill()
          ctx.fillStyle = '#ffffff'
          ctx.font = '12px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(user.name.charAt(0), user.x, user.y + 4)
        })
    }

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.offsetX - offsetX;
      startY = e.offsetY - offsetY;
  });

  canvas.addEventListener('mouseup', () => {
      isDragging = false;
  });

  canvas.addEventListener('mousemove', (e) => {
      if (isDragging) {
          offsetX = e.offsetX - startX;
          offsetY = e.offsetY - startY;
          // Prevent dragging out of bounds
          offsetX = Math.min(0, Math.max(offsetX, canvas.width - image.width));
          offsetY = Math.min(0, Math.max(offsetY, canvas.height - image.height));
          drawImage();
      }
  });

  // Optional: For touch devices
  canvas.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX - offsetX;
      startY = e.touches[0].clientY - offsetY;
  });

  canvas.addEventListener('touchend', () => {
      isDragging = false;
  });

  canvas.addEventListener('touchmove', (e) => {
      if (isDragging) {
          offsetX = e.touches[0].clientX - startX;
          offsetY = e.touches[0].clientY - startY;
          offsetX = Math.min(0, Math.max(offsetX, canvas.width - image.width));
          offsetY = Math.min(0, Math.max(offsetY, canvas.height - image.height));
          drawImage();
          e.preventDefault(); // Prevent scrolling
      }
  });

    // users.forEach(user => {
    //   ctx.beginPath()
    //   ctx.arc(user.x, user.y, 20, 0, 2 * Math.PI)
    //   ctx.fillStyle = user.type === 'user' ? '#4CAF50' : '#2196F3'
    //   ctx.fill()
    //   ctx.fillStyle = '#ffffff'
    //   ctx.font = '12px Arial'
    //   ctx.textAlign = 'center'
    //   ctx.fillText(user.name.charAt(0), user.x, user.y + 4)
    // })
  }, [users, windowWidth])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const clickedUser = users.find(user =>
      Math.sqrt(Math.pow(user.x - x, 2) + Math.pow(user.y - y, 2)) < 20
    )

    if (clickedUser) {
      setSelectedUser(clickedUser)
      setChatsOpen(true)
    }
  }

  const handleSendMessage = () => {
    if (selectedUser && message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        senderId: 0,
        text: message,
        timestamp: new Date(),
      }
      setChats(prevChats => ({
        ...prevChats,
        [selectedUser.id]: [...(prevChats[selectedUser.id] || []), newMessage],
      }))
      setMessage('')
    }
  }

  const markers = [
    {
      userId: 132,
      position: [51.505, -0.09],
      popupText: 'Marker 1',
      image: avatar1.src,
      name: 'Alex de Witte',
      pro: true,
      salsa: 3,
      title: 'Looking for dance mate!',
      bio: "I’m dancing for 10 years, I’m professional in Salsa and bachata and trying to learn more West coast swing."
    },
    {
      userId: 345,
      position: [51.51, -0.1],
      popupText: 'Marker 2',
      image: avatar2.src,
      name: 'Aroan Grey',
      pro: true,
      salsa: 2,
      title: 'Someone who know how to dance?',
      bio: "I’m dancing for 10 years, I’m professional in Salsa and bachata and trying to learn more West coast swing."
    },
    {
      userId: 42,
      position: [51.51, -0.08],
      popupText: 'Marker 3',
      image: avatar3.src,
      name: 'Charlotte de Groen',
      pro: false,
      salsa: 5,
      title: 'Anyone?',
      bio: "I’m dancing for 10 years, I’m professional in Salsa and bachata and trying to learn more West coast swing."
    },
  ];

  const navigationCb = (action: String) => {
    if (action == 'explore') {
      setChatsOpen(false)
      setUser(null)
      setFullsizeUser(false)
      setSelectedUser(null)
    }
    else if (action == 'inbox') {
      setUser(null)
      setFullsizeUser(false)
      setSelectedUser(null)
      setChatsOpen(true)
    }
  }

  return (
    <div className="flex flex-col h-screen">

      <main className="flex-grow relative flex">
        <Filter />

        {chatsOpen && (
          <div className="z-[99999] top-0 left-0 fixed inset-y-16 right-0 bg-background z-40 flex flex-col border-border" style={{ width: windowWidth > 700 ? '400px' : '100%' }}>
            { !selectedUser && <div className="bg-[#FF6F3C] text-primary-foreground p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Chats</h2>
              <Button variant="ghost" size="icon" onClick={() => {
                setChatsOpen(false)
                setSelectedUser(null)
              }}>
                <X className="h-6 w-6" />
              </Button>
            </div> }
            <div className="flex-grow flex">
              { !selectedUser && (
                <ScrollArea className="w-full border-r border-border">
                  {Object.entries(chats).map(([userId, messages]) => {
                    const user = users.find(u => u.id === parseInt(userId))
                    return (
                      <div
                        key={userId}
                        className={`p-4 border-b cursor-pointer hover:bg-muted ${selectedUser?.id === parseInt(userId) ? 'bg-muted' : ''}`}
                        onClick={() => setSelectedUser(user || null)}
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={markers.find((m) => m.userId == user?.markerId)?.image} alt='' />
                            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{user?.name}</h3>
                            <p className="text-sm text-muted-foreground">{messages[messages.length - 1].text}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </ScrollArea>
              ) }
              {selectedUser && (
                <div className="flex-grow flex flex-col">
                  <div className="bg-white text-primary drop-shadow-md p-4 flex items-center space-x-4">
                    <ChevronLeft onClick={() => setSelectedUser(null)} className="h-6 w-6 cursor-pointer" />

                    <Avatar>
                      <AvatarImage src={markers.find((m) => m.userId == selectedUser?.markerId)?.image} alt='' />
                      <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{selectedUser.name}</h3>
                  </div>
                  <ScrollArea className="flex-grow p-4">
                    {chats[selectedUser.id]?.map((msg) => (
                      <div key={msg.id} className={`mb-4 ${msg.senderId === 0 ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-2 rounded-lg ${msg.senderId === 0 ? 'bg-[#FF6F3C] text-white' : 'bg-secondary'}`}>
                          {msg.text}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="h-[100px] flex w-full max-w-sm items-center gap-2">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow h-[50px] rounded-full"
                      />
                      <Button type="submit"  className='bg-[#FF6F3C] hover:bg-[#FF6F3C] rounded-full h-[50px] w-[50px]'>
                        <Send/>
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <MapComponent markers={markers}
          onSelect={(index, markerEl) => {
            if (index == null) {
              setUser(null)
            }
            else {
              setUser(markers[index])
              markerEl.classList.add('border-2')
            }
          }}
        />
        {user && <UserShortInfoComponent user={user} onSelect={() => setFullsizeUser(true)} />}
        {fullsizeUser && <UserInfo user={user} onChat={(user) => {
          setChatsOpen(true)
          const u = users.find((u) => u.name == user.name)
          setSelectedUser(u || null)
        }} />}
      </main>


      <NavigationBarComponent onClick={navigationCb} />
    </div>
  )
}
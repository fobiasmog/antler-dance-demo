'use client'

import { useRef, useEffect, useState } from 'react'
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

type User = {
  id: number
  name: string
  x: number
  y: number
  type: 'user' | 'class'
}

type ChatMessage = {
  id: number
  senderId: number
  text: string
  timestamp: Date
}

export function DanceConnectComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [chatsOpen, setChatsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState<{ [key: number]: ChatMessage[] }>({})
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  useEffect(() => {
    const mockUsers: User[] = [
      { id: 1, name: 'Alice', x: 50, y: 100, type: 'user' },
      { id: 2, name: 'Bob', x: 150, y: 200, type: 'user' },
      { id: 3, name: 'Salsa Class', x: 250, y: 150, type: 'class' },
      { id: 4, name: 'Charlie', x: 200, y: 300, type: 'user' },
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

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight - 64

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

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

  return (
    <div className="flex flex-col h-screen">
      {/* <nav className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">DanceConnect</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Amsterdam</span>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground" onClick={() => setChatsOpen(true)}>
            <MessageCircle className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">User</p>
                  <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav> */}
      <main className="flex-grow relative flex">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full h-full"
        />
        {chatsOpen && (
          <div className="fixed inset-y-16 right-0 bg-background z-40 flex flex-col border-l border-border" style={{ width: windowWidth > 700 ? '400px' : '100%' }}>
            <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Chats</h2>
              <Button variant="ghost" size="icon" onClick={() => {
                setChatsOpen(false)
                setSelectedUser(null)
              }}>
                <X className="h-6 w-6" />
              </Button>
            </div>
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
                  <div className="bg-primary text-primary-foreground p-4 flex items-center space-x-4">
                    <ChevronLeft onClick={() => setSelectedUser(null)} className="h-6 w-6 cursor-pointer" />

                    <Avatar>
                      <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{selectedUser.name}</h3>
                  </div>
                  <ScrollArea className="flex-grow p-4">
                    {chats[selectedUser.id]?.map((msg) => (
                      <div key={msg.id} className={`mb-4 ${msg.senderId === 0 ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-2 rounded-lg ${msg.senderId === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                          {msg.text}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex space-x-2">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow"
                      />
                      <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
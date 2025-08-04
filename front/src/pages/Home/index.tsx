import { useState } from "react"
import { Plus, MessageCircle} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
// import { CreateBotModal } from "../create-bot-modal"
import { Link } from 'react-router-dom';
import { CreateBotModal } from "./components/create-bot-moda";
import { useListBots } from "../../domain/bot/queries";

// Mock data - em produção viria da API

export default function HomePage() {
  // const [bots, setBots] = useState(mockBots)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
const { data } = useListBots();

  const bots = data?.bot || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">HighCapital Chatbot</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Crie e gerencie seus chatbots personalizados com inteligência artificial
          </p>
        </div>

        {/* Create Bot Button */}
        <div className="flex justify-center mb-8">
          <Button onClick={() => setIsCreateModalOpen(true)} size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Criar Novo Chatbot
          </Button>
        </div>

        {/* Bots Grid */}
        {bots.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum chatbot criado ainda</h3>
            <p className="text-gray-500">Comece criando seu primeiro chatbot personalizado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bots.map((bot) => (
              <Card key={bot.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    {bot.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{bot.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/chat/${bot.id}`}>
                    <Button className="w-full">Abrir Chat</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <CreateBotModal
         isOpen={isCreateModalOpen}
      setIsOpen={setIsCreateModalOpen}
        />
      </div>
    </div>
      )
}

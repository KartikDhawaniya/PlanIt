package com.example.planit

import android.content.Context
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [EventParticipantsFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class EventParticipantsFragment( private val eventId: Int) : Fragment() {
    // TODO: Rename and change types of parameters
    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: ParticipantsAdapter
    private lateinit var mContext : Context
    private lateinit var swipeRefreshLayout: SwipeRefreshLayout
    private lateinit var addItemButton: ImageButton
    private lateinit var removeItemsButton: ImageButton



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        mContext = context
    }


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(
            R.layout.fragment_event_participants,
            container,
            false
        )

        recyclerView = view.findViewById(R.id.eventParticipantsRecyclerView)
        recyclerView.layoutManager = LinearLayoutManager(mContext)

        addItemButton = view.findViewById(R.id.addEventItemButton)
        removeItemsButton = view.findViewById(R.id.deleteEventItemButton)

//        addItemButton = view.findViewById(R.id.addItemButton)

        swipeRefreshLayout = view.findViewById(R.id.swipeRefreshLayout)

        swipeRefreshLayout.setOnRefreshListener {
            swipeRefreshLayout.isRefreshing = true
            fetchEventParticipants()
            swipeRefreshLayout.isRefreshing = false
        }

        fetchEventParticipants()
        return view
    }

    override fun onResume() {
        super.onResume()
        fetchEventParticipants()
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment EventParticipantsFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String, eventId: Int) =
            EventParticipantsFragment(eventId).apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }

    private fun fetchEventParticipants() {
        val url = "http://192.16.0.105:8080/events/participants/$eventId"
        val request = JsonObjectRequest(
            Request.Method.GET, url, null,
            { response ->
                Log.e("Response", response.toString())
                Log.e("Id Response", eventId.toString())
            },
            { error ->
                Log.e("Error", error.toString())
                Log.e("Id Error", eventId.toString())
            }
        )

        val queue = VolleySingleton.getInstance(mContext).requestQueue
        queue.add(request)
    }
}